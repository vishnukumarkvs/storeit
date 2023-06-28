"use client";

import {
  Button,
  Flex,
  TextField,
  useAuthenticator,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Post } from "../../models";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useAuthenticator();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(note, files);
    await DataStore.save(
      new Post({
        note,
        files: Object.keys(files),
        username: user.username,
      })
    ).then(() => {
      router.push("/view");
    });
  };
  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="flex justify-center items-center pt-10">
        <Flex as="form" direction="column" onSubmit={handleSubmit}>
          <TextField
            label="Note"
            value={note}
            placeholder="A simple title or note"
            onChange={(e: any) => setNote(e.target.value)}
          />
          <StorageManager
            accessLevel="public"
            acceptedFileTypes={[
              "image/*",
              "video/*",
              "text/*",
              "audio/*",
              "application/*",
            ]}
            maxFileCount={5}
            path={`${user.username}/`}
            onUploadSuccess={({ key = "" }) => {
              setFiles((prevFiles) => {
                return { ...prevFiles, [key]: true };
              });
            }}
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </div>
    </div>
  );
};

export default withAuthenticator(Page);
