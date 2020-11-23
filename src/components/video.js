import React, { useState, useEffect, useRef } from "react"

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
const ffmpeg = createFFmpeg({})

export default function VideoContainer() {
  const [readyToConvert, setReadyToConvert] = useState(false)
  const [videoToConvert, setVideoToConvert] = useState()
  const [convertedGif, setConvertedGif] = useState()
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")

  const loadConvertor = useRef(() => {})

  loadConvertor.current = async () => {
    await ffmpeg.load()
    setReadyToConvert(true)
  }

  useEffect(() => {
    loadConvertor.current()
  }, [])

  const convertToGif = async () => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoToConvert))
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      startAt,
      "-ss",
      endAt,
      "-f",
      "gif",
      "out.gif"
    )

    const exportedGif = ffmpeg.FS("readFile", "out.gif")
    const urlToGif = URL.createObjectURL(
      new Blob([exportedGif.buffer], { type: "image/gif" })
    )
    setConvertedGif(urlToGif)
  }

  return readyToConvert ? (
    <>
      {videoToConvert && (
        <div className="videoContainer">
          <video
            controls
            width="250"
            src={URL.createObjectURL(videoToConvert)}
          ></video>
          <div className="gifTimingContainer">
            <label className="gifTiming" htmlFor="start">
              Start at:
            </label>
            <input
              type="text"
              id="start"
              className="gifTiming"
              onChange={e => setStartAt(e.target.value)}
            />
            <label className="gifTiming" htmlFor="end">
              End at:
            </label>
            <input
              type="text"
              id="end"
              className="gifTiming"
              onChange={e => setEndAt(e.target.value)}
            />
          </div>
          <div>
            {!convertedGif && (
              <button className="convertButton" onClick={convertToGif}>
                Convert
              </button>
            )}
            {convertedGif && (
              <button
                className="convertButton"
                onClick={() => {
                  setVideoToConvert(null)
                  setConvertedGif(null)
                }}
              >
                Convert New Video
              </button>
            )}
            {convertedGif && (
              <div className="gifContainer">
                <h3>Your GIF:</h3>
                <img alt="convertedGIF" src={convertedGif} width="250" />
                <a download href={convertedGif} className="downloadGif">
                  Download Your Gif
                </a>
              </div>
            )}
          </div>
        </div>
      )}
      {!videoToConvert && (
        <input
          type="file"
          onChange={e => setVideoToConvert(e.target.files?.item(0))}
        />
      )}
    </>
  ) : (
    <div>Loading.....</div>
  )
}
