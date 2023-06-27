import { useState } from "react";
import useSWR from "swr";
import "./App.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const [showDetail, setShowDetail] = useState(false);
  const [id, setId] = useState(null);

  const { data, isLoading } = useSWR("http://localhost:3000/posts", fetcher);

  const { data: posts, isLoading: isLoadingPosts } = useSWR(
    showDetail ? `http://localhost:3000/posts/${id}` : null,
    fetcher
  );

  const { data: comments, isLoading: isLoadingComments } = useSWR(
    showDetail ? `http://localhost:3000/posts/${id}/comments` : null,
    fetcher
  );

  const handleClick = (data) => {
    if (id === data) {
      setShowDetail(!showDetail);
    } else {
      setShowDetail(true);
    }
    setId(data);
  };

  return (
    <>
      <div className="wrapper">
        <div className="body-wrapper">
          <h1>Posts</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data.map((x) => {
              return (
                <div key={x.id}>
                  <p
                    onClick={() => handleClick(x.id)}
                    className="title"
                    key={x.id}
                  >
                    {x.title}
                  </p>
                  {x.id === id && showDetail ? (
                    isLoadingPosts ? (
                      <p>Loading...</p>
                    ) : (
                      <div className="main-wrapper">
                        <p style={{ color: "grey" }}>Description</p>
                        <p className="description" key={x.id}>
                          {posts?.body}
                        </p>
                        <p style={{ color: "grey" }}>Comments</p>
                        {isLoadingComments ? <p>Loading...</p> : comments?.map((y) => (
                          <div key={y.id}>
                            <p style={{ color: "yellow" }}>{y.email}</p>
                            <p>{y.body}</p>
                          </div>
                        ))}
                      </div>
                    )
                  ) : undefined}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
