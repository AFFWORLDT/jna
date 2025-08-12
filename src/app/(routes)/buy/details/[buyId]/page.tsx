"use client";
import DetailPage from "@/src/view/buy/detailPage";
import SocialMediaFloat from "@/src/view/offPlans/socialMediaFlotionButtons";
import { useParams } from "next/navigation";
import React from "react";

function BuyDetails() {
  const { buyId } = useParams();

  return (
    <div>
        <DetailPage id={buyId} />
      <SocialMediaFloat />
    </div>
  );
}

export default BuyDetails;
