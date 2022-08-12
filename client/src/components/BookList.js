import React from "react";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getALL, getALLNoti } from "../queries/Query";
import {
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  CREATE_NOTI,
} from "../queries/Mutation";

const BookList = () => {
  const [name, setname] = useState("");
  const [genre, setgenre] = useState("");
  const [author, setauthor] = useState("");
  const [id, setid] = useState("");
  const [showupdatebtn, setshowupdatebtn] = useState(false);
  const { loading, error, data } = useQuery(getALL);
  const [createBook, { erro }] = useMutation(CREATE_BOOK);
  const [deleteBook, { errr }] = useMutation(DELETE_BOOK);
  const [updateBook, { err }] = useMutation(UPDATE_BOOK);
  const [createnoti, { er }] = useMutation(CREATE_NOTI);
  if (loading) return "Loading...";
  if (error) return "Error:(";

  // console.log({ id });
  const addbook = (e) => {
    e.preventDefault();
    if (name == "") alert("name field is empty");
    else if (genre == "") alert("genre field is empty");
    else if (author == "") alert("author field is empty");
    else {
      createBook({
        variables: {
          name: name,
          genre: genre,
          author: author,
        },
        refetchQueries: [{ query: getALL }],
      });
      setname("");
      setgenre("");
      setauthor("");
    }
  };
  const removeBook = (id) => {
    deleteBook({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: getALL }],
    });
  };

  const update = (id) => {
    console.log({ id });

    updateBook({
      variables: {
        id: id,
        name: name,
        genre: genre,
        author: author,
      },
      refetchQueries: [{ query: getALL }],
    });
  };
  const createNotification = () => {
    if (name == "") alert("Name Field is Empty");
    else if (genre == "") alert("genre field is empty");
    else if (author == "") alert("author field is empty");
    else {
      createnoti({
        variables: {
          name: name,
        },
        refetchQueries: [{ query: getALLNoti }],
      });
    }
  };
  return (
    <div>
      <form id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input
            value={name}
            placeholder={name}
            type="text"
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            value={genre}
            placeholder={genre}
            type="text"
            onChange={(e) => setgenre(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <input
            value={author}
            placeholder={author}
            type="text"
            onChange={(e) => setauthor(e.target.value)}
          />
        </div>
        {!showupdatebtn && (
          <button
            onClick={(e) => {
              addbook(e);
              createNotification();
            }}
          >
            +
          </button>
        )}
        {showupdatebtn && (
          <button
            onClick={(e) => {
              setshowupdatebtn(false);
              update(id);
            }}
          >
            Update
          </button>
        )}
      </form>
      <h1>All Books</h1>
      {data.getAll.map((data) => (
        <div key={data.id}>
          <li>{data.name}</li>
          <p>{data.genre}</p>
          <p>{data.author}</p>

          {!showupdatebtn && (
            <>
              <button onClick={() => removeBook(data.id)}> Delete it </button>
              <button
                onClick={() => {
                  setid(data.id);
                  setname(data.name);
                  setgenre(data.genre);
                  setauthor(data.author);
                  setshowupdatebtn(true);
                }}
              >
                Update
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;
