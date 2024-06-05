pipeline {
    
    agent any 
    
    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        
    }
    
    stages {
        
        stage('Checkout'){
           steps {
               sh '''
               echo passed
               git --version
               pwd
               echo pass
               '''
                // git credentialsId: 'newtoken', 
                // url: 'https://github.com/u17cs466/excellence-test-apicall.git',
                // branch: 'main'
           }
        }

        stage('Build Docker'){
            steps{
                script{
                    sh '''
                    echo 'Buid Docker Image'
                   docker build -t srikanth2233/damacharla11:${BUILD_NUMBER} .
                    '''
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    // withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhub')]) {
                    //       // some block
                    //     sh 'docker login -u srikanth2233 -p Srikanth@1234'
                    //    }
                    sh 'docker push srikanth2233/damacharla11:${BUILD_NUMBER}'
                   
                }
            }
        }
        
        stage('Checkout K8S manifest SCM'){
            steps {
               git branch: 'main', credentialsId: 'github', url: 'https://github.com/u17cs466/excellence-test-apicall.git'
            }
        }
        
        stage('Update K8S manifest & push to Repo'){
            environment {
            GIT_REPO_NAME = "excellence-test-apical"
            GIT_USER_NAME = "u17cs466"
        }
            steps {
                script{
                   withCredentials([string(credentialsId: 'demotoken', variable: 'demotoken')]) {
                        sh '''
                        ls
                        cd ReactApp
                        sed -i "s|image: srikanth2233/damacharla11:.*|image: srikanth2233/damacharla11:${BUILD_NUMBER}|g" deploy.yaml

                        cat deploy.yaml
                        git add deploy.yaml
                        
                        git config --global user.name "u17cs466"
                        git config --global user.email "srikanth.damacharla99@gmail.com"                                          
                       
                        git commit -m 'Updated the deploy yaml | Jenkins Pipeline'
                        git push https://${demotoken}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                        
                        '''                        
                    }
                }
            }
        }
        }
    }
}
