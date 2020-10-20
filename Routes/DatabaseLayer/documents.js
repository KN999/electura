const fire = require("./firebase");

// Add topic
exports.addDocument = (data, callback) => {

  fire.db
    .collection("documents")
            .add(data);

            fire.db
                .collection("documents").onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change =>{ 
                setSongs({title: change.doc.data().oneSong, aritst:change.doc.data().Artist, source: change.doc.data().src})
            })
        })
};

// Retrieve all documents
// exports.allDocuments = (callback) => {
//   let data = [];
//   fire.db
//     .collection("documents")
//     .doc(AID)
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         data.push({
//           ID: doc.id,
//           name: doc.data().name,
//           image: doc.data().image,
//         });
//       });
//     })
//     .then(() => {
//       console.log("Successfully Retrieved the details");
//       callback({ code: 200, message: "Success", data: data });
//     })
//     .catch((error) => {
//       console.log("Error getting documents", error);
//       callback({ code: 400, message: "Error", data: error });
//     });
// };

// 
exports.allDocuments = (data, callback) => {
  let retrieveDocuments = [];

  fire.db
    .collection("articles")
    .where('email', '==', {data})
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document found");
        doc.data().documents.forEach((document) => {
          retrieveDocuments.push(document);
        });
      } else {
        console.log("No such document!");
        callback({ code: 400, message: "Error" });
      }
    }, () => {
      callback({ code: 200, message: "Success", data: retrieveDocuments })
    })
    .catch((error) => {~
      console.log("Error getting documents", error);
      callback({ code: 400, message: "Error", data: error });
    });
};