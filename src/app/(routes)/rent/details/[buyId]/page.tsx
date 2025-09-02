"use client";
import DetailPage from "@/src/view/rent/detailPage";
import SocialMediaFloat from "@/src/components/common/socialMediaFlotionButtons";
import { useParams } from "next/navigation";
import React from "react";

function BuyDetails() {
  const { buyId } = useParams();

  return (
    <div>
        <DetailPage id={buyId} />
      <SocialMediaFloat css="bottom-6 right-6"/>
    </div>
  );
}

export default BuyDetails;
