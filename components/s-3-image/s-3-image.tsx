import { Image, ImageProps } from "react-native"
import { useGetImageUrlQuery } from "../../graphql/generated/graphql"
import { apiSdk, getUserId } from "../../utils/api"

const USER_PICTURE_URL =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RvcmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"

export type S3ImageProps = Omit<ImageProps, "source"> & {
  /**
   * An optional style override useful for padding & margin.
   */
  s3Path: string
}

type IProps = S3ImageProps

export const S3Image = (props: IProps) => {
  const { s3Path, ...rest } = props

  const { data, isLoading } = useGetImageUrlQuery(apiSdk, {
    fileName: s3Path,

    requestType: "get",
    type: "",
    userId: getUserId(),
  })

  return (
    <Image
      source={
        data?.getS3SignedURL?.signedURL
          ? {
              uri: data?.getS3SignedURL?.signedURL,
            }
          : require("./user.png")
      }
      {...rest}
    />
  )
}
