pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        REPO = 'https://github.com/AhmadTChaudhry/SIT753'
        DOCKER_IMAGE = 'ahmadtc/753'
        SONAR_TOKEN = credentials('SonarCloudToken')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                    echo 'DEPENDENCIES INSTALLED SUCCESSFULLY'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                    echo 'DOCKER IMAGE BUILT SUCCESSFULLY'
                }
            }
        }

        stage('Unit Tests') {
            parallel {
                stage('Server') {
                    steps {
                        script {
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
                            echo 'UNIT TESTS PASSED SUCCESSFULLY'
                        }
                    }
                }
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                script {
                    sh 'echo "sonar.projectKey=AhmadTChaudhry_SIT753" > sonar-project.properties'
                    sh 'echo "sonar.organization=ahmadtchaudhry" >> sonar-project.properties'
                    sh 'echo "sonar.sources=." >> sonar-project.properties'
                    sh 'echo "sonar.host.url=https://sonarcloud.io" >> sonar-project.properties'
                    sh 'echo "sonar.login=$SONAR_TOKEN" >> sonar-project.properties'
                    sh 'echo "sonar.exclusions=**/*.js, **/*.ts, **/*.html, **/*.css" >> sonar-project.properties'
                    sh 'sonar-scanner -Dproject.settings=sonar-project.properties'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker run -d -p 80:3040 $DOCKER_IMAGE'
                    echo 'DOCKER CONTAINER STARTED SUCCESSFULLY'
                }
            }
        }

        stage('Release') {
            steps {
                script {
                    sh 'docker login -u ahmadtc -p H2Chuhet123'
                    sh 'docker push $DOCKER_IMAGE'
                    echo 'DOCKER IMAGE PUSHED SUCCESSFULLY'
                }
            }
        }
    }
}
