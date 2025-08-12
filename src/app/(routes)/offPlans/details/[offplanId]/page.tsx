"use client";
import DetailPage from "@/src/view/offPlans/detailPage";
import SocialMediaFloat from "@/src/view/offPlans/socialMediaFlotionButtons";
import { useParams } from "next/navigation";
import React from "react";

function OffPlaneDetails() {
  const { offplanId } = useParams();
  return <div>
    <DetailPage id={offplanId} />
     <SocialMediaFloat />
  </div>;
}

export default OffPlaneDetails;
