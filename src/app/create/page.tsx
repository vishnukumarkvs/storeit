"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";

const Page = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center mt-10">
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
        />
      </div>
    </div>
  );
};

export default withAuthenticator(Page);
