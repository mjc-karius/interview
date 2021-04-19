# Pathogen Management System

## Overview

This proof of concept application is meant to provide a first pass at a design for a pathogen management system. In order to provide a functioning demo, the firebase set of mobile application services was leveraged.      The API schema is implemented as 2 typescript classes located in src/pathogens.  Once class represents the pathogen and its metadata, the other represents the sequence itself. The seperation is for queryability,  and to pave the way for better representations of the sequence, possibly using other technologies. 

## Assumptions

Because of the proof of concept / technical interview nature of this application and its specifications, I made many assumptions.  Had this been a real application, I would have worked much more closely with the stakeholders / product team to get a better understanding of what was desired. 

 1. Genetic Sequences are strings of A G T or C.  We are not modelling the possible pairs - ie AA is not a possible pairing. There are 4 possible pairs, representing these in a more compact way could get us from roughly 16 bits for 2 letters to 2 bits for  showing which of the 4 possible pairs there are.  In fact, we are sticking with the model of representing a sequence as a string. 
2. Skipping auth is acceptable - this is an assumption I would never make in the real world. 
    * all users can add or edit pathogens
    * it is not possible to tell who edited or created a pathogen, so we have to let any user edit any of them, instead of just the creator or members of an administrative role
3. Genetic sequences cannot be changed for a given pathogen, so when editing the pathogens data you cannot change the sequence
4. Searching will be performed on whole sequences only, so using a SHA1 of the sequence allows for faster and more reasonably sized queries. 


## Questions

### Extending Sequences to Millions of Characters

My first thought would be to start looking at what existing genomic data storage technologies exist, to try to leverage something as part of the solution. However, I also assume that for the purposes of a technical interview you would want me to dive into how I might start building my own. 

**Concern 1: The loading of sequences into storage**

Right now I am reading text files in and processing them client side. This is clearly an issue for performance and scalability over a certain size.  I have some clarifying questions to know how to approach this - mostly, where are the users getting these text files with genetic sequences?  Since I doubt the users are just making them up, I assume they are coming from another system -  probably the Karius labs.  I would look into changing the workflow a bit - perhaps ingesting the genetic sequences automatically as they are created and having a user sign into this interface to simply edit the metadata about the already existing sequence.  In fact, there may be opportunities to share the pathogen data system with existing systems. 

If however there are problems with the above approach, and we are still limited to users uploading sequences from a text file, the first change would be to move the processing of the text file to a backend system. This could be done with a chunked, resumable upload. 

**Concern 2:  Searching by genomic sequence**

Currently, a user uploads the complete genomic sequence text file of a pathogen to search for it, a SHA1 hash of the sequence is taken, and the sequence is searched for based on that hash.  This all needs to be rethought. We cannot have users uploading large files to search through, and it does not support partial matches.  In my research I see that there are in fact genomic databases that store and index data in ways to allow looking for close genetic matches.  

If not leveraging an existing technology for genomic data storage, I may take the next  step along the naive string data representation.  Millions of characters represented using standard strings is still in the megabytes of data per pathogen. This is well within the capabilities of something like a large ElasticSearch cluster, using a trigram index.  Cost would ultimately be the issue with this approach, though depending on the number of pathogens it might be some time before it became an issue. 

There are other, slightly less naive approaches to storage - like I mentioned before, representing valid base pairs instead of each char would reduce data size to 1/8 of what it had been. This could make the ElasticSearch approach more cost effective, though it would require encoding search strings and decoding the results. 

Ultimately, even if rolling my own, I would do more research to ensure my representation of a genomic sequence does not place unwanted limitations on the data. I am far from a geneticist, so if an expert was available I would try to use them. 

Regarding the search interface, I would also need to do more research in the form of talking to either a product manager or subject matter expert - how do users want to search for pathogens by genetic sequence? Is it even a search interface or an exploratory 'see related pathogens' feature on a pathogens detail page?

### Mobile Version
Most of the features of this application should work fine with mobile already - the searching by name, viewing pathogens, and editing their metadata should be usable on a mobile device. I am aware that there is a bit of responsive testing that still needs to be done, but the issues in these areas are not fundamental to the approach. 

The area that would need to be changed for mobile is how genomic sequences are managed.  Does the mobile user really have text files to upload to perform a search or enter a new pathogen? I believe these changes would be handled by the suggestion I made earlier of loading the sequences from the system they originated in.  It might be possible to allow users to upload some sequences to use on mobile directly from other systems (or a desktop version) as well. 


## Next Steps
Work that I did not have time to do / chose not to do because it's a technical interview

**Useful testing**

There is only a single placeholder test in this application, as I made the call it was better to focus on functionality for the 2-4 hours of work on this project. 

**Authentication**

Users would be required to sign in, so we start enforcing reasonable permissions around who can edit/add pathogens. 


**Validation of Sequences** 

Right now sequences are not validated.  At minimum we should be sure that they consist only of ATCG, however there are likely more in depth, genome specific validations also.  Deduplication / requiring that only one pathogen exists with a given sequence. 

**Tags Model**

Right now text tags are stored in an array on the pathogen model. However, it would be better to tags to be their own entity, and create a many to many relationship with pathogens. 

## Technical Design 

Because this application is for a technical interview, and the time spent on it will be limited, I had to make some choices about where to spend time.
 
**Testing** 

In this case I chose to prioritize the core functionality over testing. However, testing is very important, especially in production apps.  To balance this, I did set up the test runners and wrote a single, trivial test.  Generally, for real applications I organize tests with a $CodeFileName.test.ts file located next to each $CodeFileName.ts file. 


**Code Organization** 

I am a believer that components that are used together should be kept together in the project.  This means sub components located in the same folder as the parent page that uses them instead of a components folder. This is of course not always possible, but I believe it is a good rule of thumb.  You will see this organization in the src/views. You will also see an example of code that is used in too many places for this rule with the pathogen classes, located in src/pathogens. 

**UI Design** 

This is laid out using bootstrap, and should be mostly responsive. I am aware that the top navigation bar does not collapse correctly on mobile, which is something that would need to be investigated. As should be no surprise, I am not a designer.  I chose to focus on creating a simple, relatively functional interface rather than a flashy one. I believe I have setup a decent base for a designer (or design minded engineer) could come in and easily make it look better. I have also tried to add just enough custom CSS to show that I am capable of implementing the fancy designs that a designer might pass along.  

### Tech Stack and Artifacts

Firestore provides both a noSQL database and a set of secured endpoints to query from, allowing an essentially no development back end. Firestore is somewhat limited in queries, but is the fastest way to stand up a functioning, securable, persistence layer.

**Web**
React.js, react-bootstrap, react-router, formik, jest, react-firebase-hooks. Code located in  https://github.com/mjc-karius/interview  Deployed version located  https://karius-technical-interview.web.app

**Persistence** Firestore noSQL database, firestore react client libraries *warning- there is a limit on the hourly usage for firestore for the free tier. If you see an error message about resources-exhausted, try again in about an hour*
The code for interacting with the backend is located in the client application, the actual database is located in the firebase project https://console.firebase.google.com/project/karius-technical-interview/  . There is no way to leave this project open for public access, but I would be happy to invite people upon request. 

**Hosting** Firebase free hosting, associated with the project above.



### Running the application

A live, running instance of this application can be found here: [Pathogen Management System](https://karius-technical-interview.web.app)

Building and running this application requires a development computer with yarn installed. To run:

* Check out the project repository
* In the project directory, run `yarn install`
* run `yarn start` from the project directory

To deploy to production, you must have installed the firebase CLI, and have access to the karius-technical-interview project.  Once permissions and the CLI are set up:
* build the application with `yarn build`
* deploy the application with `firebase deploy --only hosting`

More information about the included scripts are available below

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
