import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleMovie = () => {
  const [movies, setMovies] = useState([]);
  const [single, setSingle] = useState([]);
  const [addButton, setAddButton] = useState("");
  let a = useParams();
  const api = useEffect(() => {
    FetchMovies();
  }, []);

  //  const fetchMovies = async()=>{
  //     const moviesList = await axios.get("http://localhost:8000/api/v1/auth/sendmovies").then(res=> {return res})
  // 'https://flixlistbackend-zosl.vercel.app/api/v1/auth/sendmovies'
  //     let b = movies.find(x=>x.id==a.id)
  //     setSingle(b)
  //  }

  async function FetchMovies() {
    await axios
      .get("http://localhost:30000/api/v1/auth/sendmovies")
      .then((response) => {
        console.log(JSON.stringify(response));

        if (response?.data) {
          setMovies(response.data);
        }
      });
  }

  useEffect(() => {
    if (movies?.length) {
      const movie = movies.find((i) => i.id == a.id);
      setSingle(movie);
    }
  }, [movies]);

  const add = () => {
    let data = localStorage.getItem("email");
    const parsedData = JSON.parse(data);
    const email = parsedData.data;
    const id = single._id;

    if (email) {
      try {
        axios
          .put("http://localhost:30000/api/v1/auth/add", {
            id,
            email,
          })
          .then((response) => {
            const info = response.data;
            const message = info.message;
            console.log(message);
            if (message == "Movie Already exists") {
              toast.error("movie already exists", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
            if (message == "Movie added") {
              toast.success("added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          });
      } catch (error) {
        console.log("axios has issues");
      }
    }
  };

  const remove = () => {
    let data = localStorage.getItem("email");
    const parsedData = JSON.parse(data);
    const email = parsedData.data;
    const id = single._id;

    if (email) {
      try {
        axios.put("http://localhost:30000/api/v1/auth/remove", { id, email });
        toast.success("removed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log("axios has issues");
      }
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4 col-md-6 d-flex justify-content-center">
            <img className="single_img" src={`${single?.image}`} />{" "}
          </div>
          <div className="col-lg-8 col-md-6 px-5 py-3 text-dark   ">
            <h3 className="text-danger">{single?.title}</h3>
            <h5>
              <span className="text-warning">IMDb Rating: </span> {single?.imbd}
            </h5>
            <p className="fs-6">{single?.description}</p>
            <p className="fs-6">
              <span className="fw-bold fs-6">Writers: </span>
              {single?.writers}
            </p>
            <p className="fs-6">
              <span className="fw-bold fs-6">Direcor: </span>
              {single?.director}
            </p>
            <button className="btn btn-success " onClick={add}>
              Add
            </button>
            <button className="btn btn-success ms-2" onClick={remove}>
              Remove
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default SingleMovie;
