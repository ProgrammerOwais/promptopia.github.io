"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedResult, setSearchedResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const filterPrompt = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // "i" case insensive
    return posts.filter(
      (item) =>
        regex.test(item.tag) ||
        regex.test(item.prompt) ||
        regex.test(item.creator.username)
    );
  };
  const handleChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText((prevText) => (prevText = e.target.value));

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchedData = filterPrompt(e.target.value);
        setSearchedResult(searchedData);
      }, 1000)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchedData = filterPrompt(tagName);
    setSearchedResult(searchedData);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          placeholder="Search for a tag | prompt | username"
          required
          className="search_input peer"
          onChange={handleChange}
        />
      </form>
      {/* // get the prompts */}
      {searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
