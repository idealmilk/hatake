import HomeLayout from "@/layouts/HomeLayout";
import Loader from "@/components/common/Loader";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostForm from "@/components/common/PostForm";
import Posts from "@/components/Posts";
import { UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { FetchCurrentUser } from "@/lib/firebase/firestore";

const Dashboard = () => {
  return <div>{data?.email}</div>;
};

export default Dashboard;
