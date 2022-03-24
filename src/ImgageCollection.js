import React from "react";

export function ImageCollection({ handleShow, imageList }) {
  return (
    <div class="card rounded pt-0 ml-10">
      <div class="card-body">
        <div class="card-header">
          <div class="card-title">
            <h3>Image Collections</h3>
          </div>
        </div>
        <div class="overflow-auto" style={{ height: "480px" }}>
          <div class="image-grid">
            {imageList.map((x, i) => {
              return (
                <div class="image-row">
                  <div
                    key={i}
                    className="image"
                    style={{ flex: "1", backgroundImage: `url('${x.id}')` }}
                    onClick={() => handleShow(x.id)}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
