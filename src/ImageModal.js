import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export function ImageModal({
  show,
  setShow,
  handleClose,
  settext1,
  settext2,
  url
}) {
  const [toptext, settoptext] = useState("");
  const [bottomtext, setbottomtext] = useState("");

  const onHandleSubmit = () => {
    settext1(toptext);
    settext2(bottomtext);
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={"lg"}
      >
        <Modal.Body>
          <div className="row p-3">
            <div className="col-md-6">
              <div class="image-grid">
                <div class="image-row">
                  <div
                    class="image"
                    style={{ flex: "1", backgroundImage: `url('${url}')` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-align-left">
                <div className="row">
                  <div className="col-md-6">
                    <label>Top Content</label>
                    <input
                      type="text"
                      name="toptext"
                      onChange={(e) => settoptext(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Bottom Content</label>
                    <input
                      type="text"
                      name="bottomtext"
                      onChange={(e) => setbottomtext(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onHandleSubmit}>
            Generate Meme
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
