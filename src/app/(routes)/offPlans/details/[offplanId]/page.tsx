"use client";
import DetailPage from "@/src/view/offPlans/detailPage";
import SocialMediaFloat from "@/src/components/common/socialMediaFlotionButtons";
import { useParams } from "next/navigation";
import React from "react";

function OffPlaneDetails() {
  const { offplanId } = useParams();
  return <div>
    <DetailPage id={offplanId} />
      <SocialMediaFloat css="bottom-6 right-6"/>
  </div>;
}

export default OffPlaneDetails;
