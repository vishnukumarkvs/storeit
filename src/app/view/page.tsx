"use client";

import { Post } from "@/models";
import { DataStore, Predicates, Storage } from "aws-amplify";
import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

const Page = () => {
  const { user } = useAuthenticator();
  const username = user.username;
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [searchText, setSearchText] = useState<string>(""); // State to store the search text

  // Observer post model for changes
  useEffect(() => {
    const getPosts = DataStore.observeQuery(
      Post,
      (p) => p.username.eq(username),
      {
        sort: (post) => post.updatedAt("DESCENDING"),
      }
    ).subscribe((snapshot) => {
      const { items } = snapshot;
      setPosts(items);
      console.log(items);
    });
    return () => getPosts.unsubscribe();
  }, []);

  const handleDownload = async (fileKey: any) => {
    try {
      const url = await Storage.get(fileKey);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  // Filter the posts based on search text of note or filename
  const filterPosts = (post: Post) => {
    const { note, files } = post;
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      note.toLowerCase().includes(searchTextLowerCase) ||
      files?.some((fileKey) =>
        fileKey.toLowerCase().includes(searchTextLowerCase)
      )
    );
  };

  const filteredPosts = posts.filter(filterPosts);

  return (
    <div className="w-full h-screen bg-gray-200 p-8">
      <div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search..."
          className="p-2 mb-4 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-gray-600 mb-4">{post.note}</div>
              <div className="text-gray-800 font-semibold mb-2">Files:</div>
              <ul className="list-disc list-inside">
                {post.files && post.files.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {post.files.map((fileKey, index) => {
                      const fileName = fileKey.split("/")[1]; // Get the part of the file name after '/'
                      return (
                        <li key={index} className="text-gray-600">
                          <a
                            href="#"
                            className="text-blue-500 underline"
                            onClick={() => handleDownload(fileKey)}
                          >
                            {fileName}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-600">
                    You haven't uploaded anything yet.
                  </p>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default withAuthenticator(Page);
