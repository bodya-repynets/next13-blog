"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

import { collection, onSnapshot, query } from "firebase/firestore";

export const useGlobalContext = () => useContext(GlobalContext);
const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let postsArr = [];
      querySnapshot.forEach((doc) => {
        postsArr.push({ ...doc.data(), id: doc.id });
      });
      const sortedPosts = postsArr.sort(
        (a, b) => b.time.seconds - a.time.seconds
      );
      if (user) {
        const filteredPosts = sortedPosts.filter(
          (item) => item.author === user.email
        );
        setUserPosts(filteredPosts);
      }
      setPosts(sortedPosts);
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <GlobalContext.Provider value={{ user, posts, setPosts, userPosts }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
