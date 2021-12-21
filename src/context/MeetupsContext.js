import { useHistory } from "react-router-dom";
// import { auth } from "../firebase";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const MeetupsContext = createContext();

export const useMeetups = () => {
  return useContext(MeetupsContext);
};

export const MeetupsProvider = ({ children }) => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  // ADDING NEW MEETUP
  const addNewMeetup = (title, image, address, description) => {
    const uploadTask = storage
      .ref(`${currentUser.uid}/images/${image.name}`)
      .put(image);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // console.log(progress);
        // uploading starting so loading animation starting
        setLoading(true);
      },
      (err) => {
        //handle unsuccessful uploads
        toast.error(err, {});
      },
      () => {
        storage
          .ref(`${currentUser.uid}/images`)
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            db.collection("users")
              .doc(currentUser.uid)
              .collection("meetups")
              .add({
                title: title,
                image: fireBaseUrl,
                address: address,
                description: description,
                isFavourite: false,
              });
            // console.log(fireBaseUrl);
          })
          .then(() => {
            //handle successful added meetup
            setLoading(false);
            history.replace("/");
          })
          .catch((error) => {
            toast.error(error.message, {});
            setLoading(false);
          });
      }
    );
  };

  // DELETING MEETUP
  const deleteMeetup = (id, imgURL) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure you want to delete this meetup?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // delete it!
            db.collection("users")
              .doc(currentUser.uid)
              .collection("meetups")
              .doc(id)
              .delete();
            const image_name = storage.refFromURL(imgURL).name;
            storage.ref(`${currentUser.uid}/images/${image_name}`).delete();
          },
        },
        {
          label: "No",
          onClick: () => {
            // alert("Click No");
            console.log("");
          },
        },
      ],
    });
  };

  // deletePhoto(event) {
  //   let uid = this.state.user.uid
  //   let img = event.target.name
  // storage.ref(`${id}/images`).child(uid).child(img).delete()
  //   database.ref().child(uid).child(img).remove()
  // }

  // EDITING MEETUP
  const editMeetup = (title, image, address, description, oldimage, id) => {
    // check if user logged in

    // if you don't upload new image
    if (image) {
      const uploadTask = storage
        .ref(`${currentUser.uid}/images/${image.name}`)
        .put(image);
      //initiates the firebase side uploading

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // console.log(progress);
          // uploading starting so loading animation starting
          setLoading(true);
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          storage
            .ref(`${currentUser.uid}/images`)
            .child(image.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              db.collection("users")
                .doc(currentUser.uid)
                .collection("meetups")
                .doc(id)
                .update({
                  title: title,
                  image: fireBaseUrl,
                  address: address,
                  description: description,
                });
              // setImageUrl(fireBaseUrl);
            })
            .then(() => {
              setLoading(false);
              history.replace("/");
            })
            .catch((e) => {
              alert(e.message);
            });
        }
      );
    }
    // edit meetup by old image
    else {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("meetups")
        .doc(id)
        .update({
          title: title,
          image: oldimage,
          address: address,
          description: description,
        })
        .then(() => {
          history.replace("/");
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  const value = {
    addNewMeetup,
    deleteMeetup,
    editMeetup,
    loading,
  };

  return (
    <MeetupsContext.Provider value={value}>{children}</MeetupsContext.Provider>
  );
};
