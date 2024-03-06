"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/store";
import { getRecord } from "@/store/slices/record";
import {
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function RecordDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const record: any = useSelector((state) => state.record.record);

  useEffect(() => {
    dispatch(getRecord(params.id.toString()));
  }, [params.id, dispatch]);

  return (
    <Grid container px={6}>
      <Grid item container xs={12} justifyContent="space-between" alignItems="start" spacing={2}>
        <Grid xs={8}>
          {/* <ReactPlayer
            style={{ border: "1px #000 solid" }}
            url={record?.video_url}
            width="90%"
            controls
          /> */}
          <CardMedia
            component="video"
            style={{ border: "1px #000 solid", height: 500 , width: "100%"}}
            
            controls
        src={record?.videoUrl}
      />
        </Grid>
        <Grid item xs={4}>
          {record?.notes?.array.map((i: any, j: any) => (
            <Typography key={i} variant="subtitle2" py={0.5}>
              {j+1}.  {i.content}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Grid container>
        <Grid>
          <Typography mt={8} variant="h6">
            Transcript
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="text-xl"
          >
            {record?.transcripts?.array?.transcript}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
