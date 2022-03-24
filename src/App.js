import React, { createRef, useState, useEffect } from "react";
import "./index.scss";
import { ImageCollection } from "./ImgageCollection";
import { Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ImageModal } from "./ImageModal";
import * as htmlToImage from "html-to-image";
import mockTable from "./mockTable";

const createFileName = (extension = "", ...names) => {
  if (!extension) {
    return "";
  }

  return `${names.join("")}.${extension}`;
};

function ScreenShot1({ text1, text2, url }) {
  const ref = createRef(null);

  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node);
    return dataURI;
  };

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div className="App">
      <header className="App-header">
        <div ref={ref} style={{ width: "400px" }}>
          <div class="image-grid">
            <div class="image-row">
              <div
                class="image"
                style={{ flex: "1", backgroundImage: `url('${url}')` }}
              >
                <p class="p-top">{text1}</p>
                <p class="p-bottom">{text2}</p>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={downloadScreenshot} variant="primary">
          Download Image
        </Button>
      </header>
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  const [text1, settext1] = useState("");
  const [text2, settext2] = useState("");
  const [Imageurl, setImageurl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (url) => {
    Promise.all([setImageurl(url), setShow(true), settext1(""), settext2("")]);
  };
  const [imageList, setimageList] = useState(null);

  useEffect(() => {
    var axios = require("axios");
    var MockAdapter = require("axios-mock-adapter");
    var mock = new MockAdapter(axios);
    mock.onGet("/api/images").reply(200, {
      images: mockTable
    });
    axios.get("/api/images").then(function (response) {
      setimageList(response.data.images);
    });
  }, []);

  return (
    <div className="App">
      <div className="mb-10">
        <ImageModal
          settext1={settext1}
          settext2={settext2}
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          url={Imageurl}
        />
      </div>
      <div className="row">
        <div className="col-md-8">
          {imageList && (
            <ImageCollection imageList={imageList} handleShow={handleShow} />
          )}
        </div>
        <div className="col-md-4">
          {text1 && text2 && (
            <ScreenShot1 url={Imageurl} text1={text1} text2={text2} />
          )}
        </div>
      </div>
    </div>
  );
}
