node {
    def registry = '58910810/capstone_cloud_devops'
    stage('Checking out git repo') {
      echo 'Checkout...'
      checkout scm
    }

    stage('Checking environment') {
      echo 'Checking environment...'
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
    }

    stage("Linting") {
      echo 'Linting...'
      sh 'tidy -q -e app/*.html' 
    }

  
    stage('Deploying') {
      echo 'Deploying to AWS...'
      dir ('./') {
        withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
            sh "aws eks --region us-east-2 update-kubeconfig --name MyCapstoneEKS-yjQYyIp7laWr"
            sh "kubectl apply -f aws/aws-auth-cm.yaml"
            sh "kubectl set image deployments/capstone-app capstone-app=${registry}:latest"
            sh "kubectl apply -f aws/capstone-app-deployment.yml"
            sh "kubectl apply -f aws/load-balancer.yml"
            sh "kubectl get nodes"
            sh "kubectl get pods"
        }
      }
    }


		stage('Deploy blue container') {
        echo 'Deploying  blue container...'
        dir ('./') {
          withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
            sh "aws eks --region us-east-2 update-kubeconfig --name MyCapstoneEKS-yjQYyIp7laWr"
            sh "kubectl apply -f aws/aws-auth-cm.yaml"
            sh 'kubectl apply -f blue-controller.json'
          }
      }
		}

		stage('Deploy green container') {
       echo 'Deploying  green container...'
        dir ('./') {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh 'kubectl apply -f green-controller.json'
				}
        }
		}

		stage('Create the service in the cluster, redirect to blue') {
      echo 'Creating service in the cluster...'
        dir ('./') {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh 'kubectl apply -f blue-service.json'
				  }
        }
		}

		stage('Create the service in the cluster, redirect to green') {
      echo 'Ready to switch'
      echo 'Create the service in the cluster, redirect to green'
      dir ('./') {
			withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh 'kubectl apply -f green-service.json'
				}
      }
		}

    stage("Cleaning up") {
      echo 'Cleaning up...'
      sh 'docker system prune'
    }

}
