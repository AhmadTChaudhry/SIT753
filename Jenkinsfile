pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        REPO = 'https://github.com/AhmadTChaudhry/SIT753'
        DOCKER_IMAGE = 'ahmadtc/753'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Run Server and Tests') {
            parallel {
                stage('Server') {
                    steps {
                        script {
                            sh 'CODECLIMATE_REPO_TOKEN=266f2d26f304bb31de9edca5073d46e9967308ba2ea094f05f00138bc5030ecb codeclimate-test-reporter before_build'
                            sh 'npm start &'
                            sleep 5
                        }
                    }
                }
                stage('Test') {
                    steps {
                        script {
                            sleep 5
                            sh 'npm test'
                            sh 'CODECLIMATE_REPO_TOKEN=266f2d26f304bb31de9edca5073d46e9967308ba2ea094f05f00138bc5030ecb codeclimate-test-reporter after_test'
                        }
                    }
                }
            }
        }

        // stage('Code Quality Analysis') {
        //     steps {
        //         script {
        //             def scannerHome = tool 'SonarCloud' // Ensure this matches the updated name
        //             withSonarQubeEnv('SonarCloud') {
        //                 sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=AhmadTChaudhry_SIT753 -Dsonar.organization=ahmadtchaudhry -Dsonar.sources=."
        //             }
        //         }
        //     }
        // }

        stage('Release to Production') {
            steps {
                script {
                    sh 'docker run -d -p 80:3040 $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    sh 'docker login -u ahmadtc -p H2Chuhet123'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
    }
}
