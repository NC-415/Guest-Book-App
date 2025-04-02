variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "eu-north-1"
}

variable "ec2_ami_id" {
  description = "AMI ID for EC2 instance (Ubuntu 22.04 LTS)"
  type        = string
  default     = "ami-0989fb15ce71ba39e" # Ubuntu 22.04 LTS in eu-north-1, update as needed
}

variable "ec2_instance_type" {
  description = "Instance type for EC2"
  type        = string
  default     = "t3.micro"
}

variable "ec2_key_name" {
  description = "Key pair name for SSH access"
  type        = string
  default     = "book" # Make sure this key exists in your AWS account
}

variable "frontend_image" {
  description = "Docker image for frontend"
  type        = string
}

variable "backend_image" {
  description = "Docker image for backend"
  type        = string
}