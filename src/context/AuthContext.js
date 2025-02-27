import React, { createContext, useState, useContext, useEffect } from 'react';
// Firebase imports commented out for development
// import { initializeApp } from 'firebase/app';
// import { 
//   getAuth, 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged
// } from 'firebase/auth';
// import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyABC123",
//   authDomain: "gut-health-app.firebaseapp.com",
//   projectId: "gut-health-app",
//   storageBucket: "gut-health-app.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456789:web:abc123"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase auth state listener (commented out for development)
  // useEffect(() => {
  //   // Listen for auth state changes
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       try {
  //         // Get user profile from Firestore
  //         const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  //         
  //         if (userDoc.exists()) {
  //           const userData = userDoc.data();
  //           setUser({
  //             id: firebaseUser.uid,
  //             email: firebaseUser.email,
  //             name: userData.name || firebaseUser.displayName || firebaseUser.email.split('@')[0],
  //             ...userData
  //           });
  //         } else {
  //           // If no user document, just use Firebase auth data
  //           setUser({
  //             id: firebaseUser.uid,
  //             email: firebaseUser.email,
  //             name: firebaseUser.displayName || firebaseUser.email.split('@')[0]
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error getting user document:", error);
  //         setUser({
  //           id: firebaseUser.uid,
  //           email: firebaseUser.email,
  //           name: firebaseUser.displayName || firebaseUser.email.split('@')[0]
  //         });
  //       }
  //     } else {
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });
  //
  //   // Cleanup subscription
  //   return () => unsubscribe();
  // }, []);

  // For development until Firebase is properly set up
  useEffect(() => {
    // Check localStorage for saved user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      // For development until Firebase is properly set up
      const userData = {
        id: 'user123',
        email,
        name: email.split('@')[0]
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      // For development until Firebase is properly set up
      const userData = {
        id: 'user' + Date.now(),
        name,
        email
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // For development until Firebase is properly set up
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('savedRecipes');
      localStorage.removeItem('groceryList');
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};