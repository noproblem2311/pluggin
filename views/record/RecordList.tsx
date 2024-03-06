"use client";
import RecordItem from "@/components/record/RecordItem";
import { useDispatch, useSelector } from "@/store";
import { getRecords } from "@/store/slices/record";
import {  Container, Grid } from "@mui/material";
import React, { useEffect } from "react";


export default function RecordList() {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.record.records);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  return (
    <Container  maxWidth="xl">
      <Grid container spacing={2}>
        {records.map((i: any) => (
          <Grid key={i.id} item>
            <RecordItem id={i.id} videoUrl={i.videoUrl} title={i.title}  />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
