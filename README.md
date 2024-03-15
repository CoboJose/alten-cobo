# alten-cobo  

## Versions

- **Node:**         20.11.1
- **npm:**	        10.5.0
- **Angular:**		17.2.3
- **Typescript:**	5.3.2

- **Angular Material:**	17.2.2

## How to run with docker

Execute this commands in the console at the root level of the project:

> docker build -t alten-cobo-image .
> docker run -d -p 127.0.0.1:80:80 alten-cobo-image

Open your browser to: http://127.0.0.1


## How to run for development

Make sure you have node and angular CLI installed 

[Node Website](https://nodejs.org/en)
> npm install -g @angular/cli

Execute this commands in the console at the root level of the project:

> npm i
> ng serve

Open your browser to: http://localhost:4200