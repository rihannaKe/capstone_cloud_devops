## CAPSTONE PROJECT UDACITY CLOUD DEVOPS NANODEGREE

### project overview
This porject is demostration of applying skills and knowledge  developed throughout the Cloud DevOps Nanodegree program. These include:
* Working in AWS
* Using Jenkins to implement Continuous Integration and Continuous Deployment
* Building pipelines
* Working with Ansible and CloudFormation to deploy clusters
* Building Kubernetes clusters
* Building Docker containers in pipelines

## The app
The app is a starter template for [Learn Next.js](https://nextjs.org/learn).


 stage('Test') {
            steps {
                sh 'jenkins/test.sh'
            }
        }