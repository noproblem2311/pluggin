import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useRouter } from "next/navigation";
import { CardMedia } from "@mui/material";

export interface RecordItemProps {
  id: string;
  videoUrl: string;
  title: string;
}

export default function RecordItem(item: RecordItemProps) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => {
        router.push(`record/${item.id}`);
      }}
    >
      <CardMedia
        component="video"
        style={{width: 345, height: 180}}
        src={item.videoUrl}
      />
      <CardHeader title={item.title} />
    </Card>
  );
}
