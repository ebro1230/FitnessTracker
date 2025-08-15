import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadFileToS3 = async (selectedFile) => {
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `profile-pictures/${Date.now()}-${selectedFile.name}`,
    Body: Buffer.from(await selectedFile.arrayBuffer()),
    ContentType: selectedFile.type,
  };
  try {
    await s3.send(new PutObjectCommand(params));
    return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("File upload failed");
  }
};
