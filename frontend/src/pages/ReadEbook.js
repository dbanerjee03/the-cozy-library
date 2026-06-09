import {
  useState,
  useEffect
} from "react";

import { ReactReader } from "react-reader";

import { useLocation } from "react-router-dom";

function ReadEbook() {

  const locationData =
    useLocation();

  const fileName =
    locationData.state?.fileName;

    useEffect(() => {

  if (fileName) {

    localStorage.setItem(

      "last-read-book",

      fileName

    );

  }

}, [fileName]);

  const storageKey =
    `ebook-progress-${fileName}`;

  const [location, setLocation] =
    useState(null);

  useEffect(() => {

    const savedLocation =
      localStorage.getItem(
        storageKey
      );

    if (savedLocation) {

      setLocation(
        savedLocation
      );

    }

  }, [storageKey]);

  const handleLocationChange = (
    newLocation
  ) => {

    setLocation(
      newLocation
    );

    localStorage.setItem(

      storageKey,

      newLocation

    );

  };

  const bookUrl =
    `/ebooks/${fileName}`;

  return (

    <div
      style={{
        height: "100vh"
      }}
    >

      <ReactReader

        url={bookUrl}

        location={location}

        locationChanged={
          handleLocationChange
        }

      />

    </div>

  );

}

export default ReadEbook;