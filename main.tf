# AWS Provider configuration
provider "aws" {
  region = var.aws_region
}

# Define the VPC
resource "aws_vpc" "guestbook_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "guestbook-vpc"
  }
}

# Create a public subnet
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.guestbook_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"
  tags = {
    Name = "guestbook-public-subnet"
  }
}

# Create an internet gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.guestbook_vpc.id
  tags = {
    Name = "guestbook-igw"
  }
}

# Create a route table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.guestbook_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
  tags = {
    Name = "guestbook-public-rt"
  }
}

# Associate route table with the public subnet
resource "aws_route_table_association" "public_rta" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Create a security group for the EC2 instance
resource "aws_security_group" "ec2_sg" {
  name        = "guestbook-ec2-sg"
  description = "Allow SSH, HTTP and app traffic"
  vpc_id      = aws_vpc.guestbook_vpc.id

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend API access
  ingress {
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "guestbook-ec2-sg"
  }
}

# Create an EC2 instance
resource "aws_instance" "guestbook_app" {
  ami                    = var.ec2_ami_id
  instance_type          = var.ec2_instance_type
  key_name               = var.ec2_key_name
  subnet_id              = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu
              EOF

  tags = {
    Name = "guestbook-app-server"
  }
}

# Output the public IP of the EC2 instance
output "ec2_public_ip" {
  value       = aws_instance.guestbook_app.public_ip
  description = "The public IP address of the EC2 instance"
}

output "ec2_public_dns" {
  value       = aws_instance.guestbook_app.public_dns
  description = "The public DNS of the EC2 instance"
}