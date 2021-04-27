import React, { useState, useEffect, useRef } from "react"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { Container, Dimmer, Loader, Image, Segment } from "semantic-ui-react"

const ffmpeg = createFFmpeg({})

export default function VideoContainer() {
  const [readyToConvert, setReadyToConvert] = useState(false)
  const [videoToConvert, setVideoToConvert] = useState()
  const [convertedGif, setConvertedGif] = useState()
  // const [startAt, setStartAt] = useState("")
  const [duration, setDuration] = useState("")
  // const [endAt, setEndAt] = useState("")

  const loadConvertor = useRef(() => {})

  loadConvertor.current = async () => {
    await ffmpeg.load()
    setReadyToConvert(true)
  }

  useEffect(() => {
    loadConvertor.current()
  }, [loadConvertor])

  const convertToGif = async () => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoToConvert))
    await ffmpeg.run(
      "-i",
      "test.mp4",
      duration && "-t",
      duration && duration,
      "-f",
      "gif",
      "out.gif"
    )

    const exportedGif = await ffmpeg.FS("readFile", "out.gif")
    const urlToGif = URL.createObjectURL(
      new Blob([exportedGif.buffer], { type: "image/gif" })
    )
    setConvertedGif(urlToGif)
  }

  return (
    <Container style={{ marginBottom: "1rem" }}>
      <div className="App">
        <div className="mainContainer">
          <div className="Container">
            {readyToConvert ? (
              <>
                <div className="videoContainer">
                  <div className="gifTimingContainer">
                    <label className="gifTiming" htmlFor="duration">
                      Choose a video file:
                    </label>
                  </div>
                  {videoToConvert && (
                    <>
                      <video
                        type="/video*"
                        controls
                        width="150"
                        src={URL.createObjectURL(videoToConvert)}
                      >
                        <track
                          kind="captions"
                          src={URL.createObjectURL(videoToConvert)}
                        />
                      </video>
                      <div className="gifTimingContainer">
                        <label className="gifTiming" htmlFor="duration">
                          Duration:
                        </label>
                        <input
                          type="text"
                          id="duration"
                          className="gifTiming"
                          onChange={e => setDuration(e.target.value)}
                        />
                      </div>
                      <div>
                        {/* {convertedGif && ( */}
                        <button
                          className="convertButton"
                          onClick={convertToGif}
                        >
                          Convert
                        </button>
                        {/* )} */}
                        {/* {convertedGif && ( */}
                        <button
                          className="convertButton"
                          onClick={() => {
                            setVideoToConvert(null)
                            setConvertedGif(null)
                          }}
                        >
                          Convert New Video
                        </button>
                        {/* )} */}
                        {convertedGif && (
                          <div className="gifContainer">
                            <h3>Your GIF:</h3>
                            <img
                              alt="convertedGIF"
                              src={convertedGif}
                              width="150"
                            />
                            <a
                              download
                              href={convertedGif}
                              className="downloadGif"
                            >
                              Download Your Gif
                            </a>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {!videoToConvert && (
                    <input
                      className="gifTimingContainer"
                      type="file"
                      accept="video/*"
                      onChange={e => setVideoToConvert(e.target.files?.item(0))}
                    />
                  )}
                </div>
              </>
            ) : (
              <Segment>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
