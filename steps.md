IAM and EC2 setup
et security gourp with inbound rules with MyIp, and custom ip port 8080 for jenkins
Login with IAM user

Install Jenkins
$ sudo apt-get update
$ sudo apt install -y default-jdk
$ wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
$ sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
$ sudo apt-get update
$ sudo apt-get install -y jenkins
$ sudo cat /var/lib/jenkins/secrets/initialAdminPassword

Install Jenkins Plugins
→ manage plugins → install
- BlueOcean
- github plugins
- kubernetes plugin

On Jenkins create 2 credentials
1. for ecr or dockerhub
2. for aws credential

Install tidy for html linting
sudo apt-get update -y
sudo apt-get install -y tidy

INSTALL docker
$ sudo apt update
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
$ sudo apt update
$ sudo apt install docker-ce
$ sudo systemctl status docker
$ sudo usermod -aG docker ${USER}

INSTALL python
sudo apt install python3.7
sudo apt install python3-pip
pip3 --version

Install aws cli  https://docs.aws.amazon.com/cli/latest/userguide/install-linux.html
$ curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
$ unzip awscli-bundle.zip
$ sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws


Install kubectl
https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html
$ curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.16.8/2020-04-16/bin/linux/amd64/kubectl
$ chmod +x ./kubectl
$ mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin
$ echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc
$ kubectl version --short --client

https://stackoverflow.com/questions/57719644/how-to-setup-kubectl-within-jenkins
