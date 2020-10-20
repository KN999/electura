const fire = require("./firebase");

// Add topic
exports.addArticle = (article, callback) => {
  fire.db.collection("articles").doc(article.topicid).set(article);
  callback({ code: 200, message: "Success" });
};

// Retrieve all documents for loggedin users
exports.allArticlelogged = (callback) => {
  let data = [];
  fire.db
    .collection("articles")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
    })
    .then(() => {
      console.log("Successfully Retrieved the details");
      callback({ code: 200, message: "Success", data: data });
    })
    .catch((error) => {
      console.log("Error getting documents", error);
      callback({ code: 400, message: "Error", data: error });
    });
};

// Retrieve all documents for nonlogged in user
exports.allArticle = (callback) => {
  let data = [];
  fire.db
    .collection("articles")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if(doc.data().isFeatured === "false")
          data.push(doc.data());
      });
    })
    .then(() => {
      console.log("Successfully Retrieved the details");
      callback({ code: 200, message: "Success", data: data });
    })
    .catch((error) => {
      console.log("Error getting documents", error);
      callback({ code: 400, message: "Error", data: error });
    });
};

// Get all products with all details
exports.specificArticle = (AID, callback) => {

  fire.db
    .collection("articles")
    .doc(AID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document found");
        this.similarArticle(doc.data().tag, AID, doc.data().count, callback);
      } else {
        console.log("No such document!");
        callback({ code: 400, message: "Error" });
      }
    })
    .catch((error) => {~
      console.log("Error getting documents", error);
      callback({ code: 400, message: "Error", data: error });
    });
};

exports.similarArticle = (tags, AID, count, callback) => {

  const data = [];
  fire.db
  .collection("articles")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      let result = tags.filter(value => doc.data().tag.includes(value));
      if(result.length > 0 && doc.data().topicid !== AID) {
        data.push(doc.data());
      }
      else if(doc.data().topicid === AID)
        data.push(doc.data());
    })

  })
  .then(() => {
    this.increaseCount(AID, count, data, callback);
  })
  .catch((error) => {
    console.log("Error getting documents", error);
    callback({ code: 400, message: "Error", data: error });
  })
}

exports.increaseCount = (topicid, count, data, callback) => {
  
  fire.db
    .collection("articles")
    .doc(topicid)
    .update({count : count+1})
    .then(() => {
      console.log("Successfully increased! : ");
      callback({ code: 200, message: "Success", data: data });
    })
    .catch((error) => {
      console.log("Error getting documents", error);
    });
};

// Put Article
exports.putArticle = (AID, article, callback) => {
  fire.db
    .collection("articles")
    .doc(AID)
    .update(article)
    .then(() => {
      console.log("Done!");
      callback({ code: 200, message: "Success" });
    })
    .catch((error) => {
      console.log("Error getting documents", error);
      callback({ code: 400, message: "Error", data: error });
    });
};

// Patch Article
exports.patchArticle = (article, callback) => {
  const Update = {};
  article.data = article.data.slice(1,-1);
  article.data = article.data.split(",");
  Update[`${article.datafield}`] = article.data;

  fire.db
    .collection("articles")
    .doc(article.AID)
    .update(Update)
    .then(() => {
      console.log("Done!");
      callback({ code: 200, message: "Success" });
    })
    .catch((error) => {
      console.log("Error getting documents", error);
      callback({ code: 400, message: "Error", data: error });
    });
};

// delete the Article
exports.deleteArticle = (AID, callback) => {
  fire.db
    .collection("articles")
    .doc(AID)
    .delete()
    .then(() => {
      console.log("Successfully Retrieved the details");
      callback({ code: 200, message: "Success" });
    })
    .catch((error) => {
      console.log("Error getting documents", error);
      callback({ code: 400, message: "Error", data: error });
    });
};
