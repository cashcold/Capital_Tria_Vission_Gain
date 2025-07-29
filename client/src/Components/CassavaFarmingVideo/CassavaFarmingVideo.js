import React from "react";
import "./CassavaFarmingVideo.css"; // Reuse this for cassava too or rename if needed

const CassavaFarmingVideo = () => {
  return (
       <div className="cassava-video-container">
      <h2 className="cassava-heading">🌱 Cassava Farming Project</h2>
      <p className="cassava-description">
        Cassava farming plays a key role in food security and income generation.
        With Capital Gain Management Co., your investment supports sustainable cassava cultivation and earns from real agricultural output.
      </p>
      <div className="cassava-video-wrapper">
        <video
          className="cassava-video"
          src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FcapgaincoCassavafARM.mp4?alt=media&token=f5030431-d0c6-4b95-b1ca-422fbdd786ec"
          controls
          autoPlay
          muted
          loop
        />
      </div>
      
    </div>
  );
};

export default CassavaFarmingVideo;
