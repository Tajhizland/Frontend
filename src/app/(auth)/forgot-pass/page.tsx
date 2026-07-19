"use client";

import React from "react";
import AuthFlow from "@/components/Auth/AuthFlow";

const PageForgotPass = () => {
    return <AuthFlow initialStep="FORGOT_MOBILE" />;
};

export default PageForgotPass;
