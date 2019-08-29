# Documentation of the Backend part
> Deliverable D1
## General group information
| Member n. | Role | First name | Last Name | Matricola | Email address |
|-----------|---------------|------------|-----------|-----------|-----------------|
| 1 | administrator | Davide | Calabrò | 866882 | davide.calabro@mail.polimi.it |
| 2 | member | Jitendra | Abey Gunawardena | 866524 | bar@example.com |

## Links to other deliverables
- Deliverable D0: the web application is accessible at [this
address](https://example.com).
- Deliverable D2: the YAML or JSON file containing the specification
of the app API can be found at [this
address](https://example.com/backend/spec.yaml).
- Deliverable D3: the SwaggerUI page of the same API is available at
[this address](https://example.com/backend/swaggerui).
- Deliverable D4: the source code of D0 is available as a zip file at
[this address](https://example.com/backend/app.zip).
- Deliverable D5: the address of the online source control repository
is available [this address](https://examplegit.com). We hereby
declare that this is a private repository and, upon request, we will
give access to the instructors.

### Introduction
Before starting with backend documentation, we decided to make a little introduction to explain why we take some decisions in the web application develop.<br>
In particular, we start to say that one of the component of our team, Davide Calabrò, is a worker-student and he works as Back-End Web Developer, basically in .NET enviroment. That's why, as you will can see in the document, we used some methodologies and approchies that they wern't explained in the lectures. 

## Specification
### Web Architecture
In the projectation phase, we decided to create a very simple and modular structure. As you can see from the image above, the structure is composed by 3 parts:
- The Data Layer: it's responsable of manage the database behind the web app. That layer is entirely in the API side and no one method in other part of the application accesses the DB.
- The Application Layer: it's responsable of manage all the non-API requests of the application, manage the sessions info and respond with the HTML pages.
- The Presentation Layer: it's responsable of draw the right contents into the pages. This part is mainly client-side, in the sense that to avoid the server-side render, we used a simple technic that is fill the content in the page calling the API from the JS, with AJAX.

For explain better why our application doesn't use server side rendering, we use a simple example.
When an event page is called, the Application Layer responds with a static HTML page, which means that the page contains all the static component (all hidden for the moment) that can be needed. Once the page is loaded, the JS file start to fill the page calling the API via AJAX and draw the result into the static HTML components and then make them visible.<br>

### API
#### REST compliance
In the API design we decided, once again, to make a very simple structure. The main concept is to have few requests type and combine them to have more complex requests.<br>
All the API methods are usefull, we created only the requests we needed.<br>
A simple example is the listing page of the event. We decided to have a "continuing filtering", so we can dynamically choose a subset of types, simply check or uncheck the filters in the page. The request is always the same, and this is done for every type checked. When all the requests are completed, the AJAX caller takes all the results and combine them to have finally the subset of events.

#### API Error management
Initially, we started to develop a large quantity of message and codes in order to better manage the errors generated when, for example, an ID doesn't exist. Anyway, quickly we noticed that weren't the smartest solution, because the mainteinance was starting to be tricky.<br> 
For that reason we simply decide, once again, to not respond with a specific error, but in most cases with null response or, when needed, a specific message response model, in order to write a message with the error, but always with an <i>HTTP 200</i> code response, and then manage all these cases in the <i>AJAX success</i> function.<br>
We know that probably this is not the best way to reduce error management complexity, but we simply assessed that it was uselessly tricky considering our goals.

#### OpenAPI Resource models
In the resource models we created basically the entities we have in ER diagram. We have, for sure, the models of the strong entities, so we have <i>event, seminar, performer</i> and <i>user</i>.<br>
We have then the <i>booking</i> model that is responsable to represent the relation between the user and the event they've reserved.<br>
We have finally a support model, the <i>ResponseModel</i> that is responsable to represent the result of the request, such as the response code and the response message. Basically this model is used only in case of unhadler error.

### Data model
Mainly the data model in API maps the ER diagram, and so the tables in DB. This is particulary true for the strong entities, like <i>event, seminar, performer</i> and <i>user</i>. In those models, basically, we don't have particular differences, apart for the add of one or two support columns, which are usefull to avoid useless requests.<br> For example in the event model we added the column <i>SeminarName</i> to avoid do another request to retrieve the name of the linked seminar, if exists.<br>
For the <i>booking</i> model the map with the <i>booking</i> table is identical.

## Implementation
### Tools used
Basically we used the tools suggest us from the teachers in the lectures. The main language is, obviously, <i>JavaScript</i>. As you can read in the previous sections, we used a lot the <i>AJAX calls</i> in order to get content for the pages, and also we largely used <i>JQuery</i> as plugin to draw and manages HTML components.<br>
For the database part we used <i>pgAdmin</i> as query tool and, obviously, <i>SQL</i> for the queries.<br>
For the rest we haven't used any other tools or languages.

### Discussion

#### WebApp adherence to OpenAPI specification and tests
In order to having a develop driven by the API, we started to project and develop first the OpenAPI and DB part. Before starting develop the frontend part, we test all the OpenAPI requests and methods we created. We test it manually, but having a specific set of cases to submit to the OpenAPI methods. We are sure that the app adheres to the provided OpenAPI specification because this one has been developed after all the API part, so the development was driven by the API. After that, obviously, we test the adherence to OpenAPI specification once again, but this time from the all methods which call the API (from <i>AJAX</i>)

#### WebApp adherence to common practices to partition a REST-based web application
We are sure that our app adheres to common practices to partition a REST-based web application because in the static assets the application data part is parameterized with placeholder, and only on client-side the page is completed, as you can read in the previous section, with the <i>AJAX</i> calls.

#### Session state
Let's start by saying that the sessions are managed only in the <i>User</i> controller. All the user info, such us login status, are managed via API. There is mainly one method, that is <i>/user/logged</i> that returns the info about the current logged user, if exists, or a specific message if there isn't a logged user.<br>
Basically, every page that need to know the user status will call this method to retrieve user info, or only to know if someone is logged.<br>
After that, there are other controls on the session object on some methods, specially in <i>booking</i> part in order to avoid anonymously reservation or other illegal operations.

#### Data model management
For the data model management we choose to use a relation database. In particular we used the one suggested in the lecture, that is <i>PostGRE SQL</i>. As you can read in previous sections we use <i>pgAdmin</i> as management tool and, for the design, we created a simple database but very consistent.

## Other information
### Task assignment
As we said in the introduction, we decided to split the three main part of the develop. Davide mainly carred about the programming part, especially the backend part, insted Jitendra carred about the desing and the usability part for our web app, but also looking the usability report part.
In particular, we can divide our work in these parts and percentages:
> Davide worked on:
- back end implementation (100%)
- back end design (50%)
- front end implementation (50%)
- front end design (mockup, IDM diagrams, etc.) (30%)
- database design (50%)
- usability design (10%)
- usability report (10%)
- test OpenAPI and web app (10%)
> Jitendra worked on:
- back end design (50%)
- front end implementation (50%)
- front end design (mockup, IDM diagrams, etc.) (70%)
- database design (50%)
- usability design (90%)
- usability report (90%)
- test OpenAPI and web app (90%)

Basically, we worked together in class (or, however, in study hall and Politecnico's rooms) in order to help each other in some parts. Davide helps Jitendra on the coding part, programming side by side and then Jitendra helps Davide to study the usability and how design an interface.

### Analysis of existing API
For the API we started by considering Davide's experience. In particular he worked with some API services, in particular Google Analytics and Google Search Console REST API, but the API service Davide looks mainly was the HubSpot API. So, resuming:
> - We took partial inspiration from API HubSpot API because it had the modular and simple structure we were looking for
> - We took partial inspiration from Google service (Analytics and Search Console) concerning mainly the JSON response structure  

### Learning outcome
Each of us learning a lot in this project, we can resume in:
> <b>Davide</b>: I found out a new world in web app development, because I always have programmed in .NET enviroment that is very different in many ways, starting from the server-side rendering with Razor. Moreover, I learned a lot on the design of usability part. <br>
Mainly caused by the typical division into departments in a company, I often ignored the graphic's job and its important. I learned that the colors and the usability for disabled people are very important and you to consider it in the design part.<br> 
