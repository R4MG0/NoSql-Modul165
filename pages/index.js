/* eslint-disable jsx-a11y/alt-text */
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRedirectToLogin } from "@lib/session";
import { useEffect, useState } from "react";
import { getAllPosts, getUserByFirstName } from "@lib/api";
import { Button, ListGroup, ListGroupItem, Card } from "react-bootstrap";

const profile =
  "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

export default function IndexPage({ session }) {
  useRedirectToLogin(session);

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const loadPosts = async () => {
      const response = await getAllPosts();

      let tmp = response.reverse();

      setPosts(tmp);
    };

    loadPosts();

    setUser(session.user);
  }, []);

  return (
    <div className={styles.posts}>
      {session.user &&
        posts.map((post) => {
          return (
            <Link href={`/posts/${post.id}`} key={post.id} passHref>
              <div key={post.id}>
                <Card className={styles.hello}>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title>{post.title}</Card.Title>
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Img
                    variant="top"
                    src={post.img}
                    className="img"
                  ></Card.Img>
                  <Card.Body>
                    {session.user.firstName === post.user ? (
                      <Link href={`/profile`}>
                        <div>
                          <div className={styles.profile}>
                            <div className={styles.img}>
                              {post?.profileImg ? (
                                <img src={post.profileImg} />
                              ) : (
                                <img src={profile} />
                              )}
                            </div>
                            <Card.Text className={styles.card}>
                              {post.user}
                            </Card.Text>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link href={`/users/${post?.userID}`}>
                        <div>
                          <div className={styles.profile}>
                            <div className={styles.img}>
                              {post?.profileImg ? (
                                <img src={post.profileImg} />
                              ) : (
                                <img src={profile} />
                              )}
                            </div>
                            <Card.Text className={styles.card}>
                              {post.user}
                            </Card.Text>
                          </div>
                        </div>
                      </Link>
                    )}
                    <div className={styles.topRight}>
                      <Card.Subtitle align="right">
                        {post.date} {post.time}
                      </Card.Subtitle>
                    </div>

                    <Link href={`/posts/${post.id}`}>
                      <Button variant="primary">Details</Button>
                    </Link>
                    <Link href={`/posts/${post.id}`}>
                      <Button
                        style={{ background: "none", border: "none" }}
                        variant="primary"
                      >
                        💬
                      </Button>
                    </Link>

                    {/* <Card.Img src={session.user.img}/> */}
                  </Card.Body>
                </Card>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
