
import type { ViewOrderWithFeedback } from "@/types/api";
import Feedback from "@/components/feedback/feedback";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { baseUrl } from "@/lib/config";
import axios from "axios";
import { FC } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ShowDetails from "./_components/ShowDetails";
type TSingleOrderProps = {
  params: {
    id: string[];
  };
};

const Page: FC<TSingleOrderProps> = async ({ params }) => {
  const orderId = params.id;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  const order = await axios.get(`${baseUrl}/api/single-order`, {
    params: {
      orderId: orderId,
    },
  });
  const data: ViewOrderWithFeedback = order.data.body[0];

  const feedbackGiven = await axios.get(`${baseUrl}/api/send-feedback`, {
    params: {
      userId: userId,
      orderId: orderId,
    },
  });

  return (
    <MaxWidthWrapper>
      <div>
        <ShowDetails data={data} />
        {!data.feedback && (
          <>
            <div className="font-bold pt-10">Aika antaa palaute!</div>

            {!feedbackGiven.data.feedbackGiven && (
              <Feedback orderId={orderId} />
            )}
          </>
        )}
        {feedbackGiven.data?.feedbackGiven && (
          <p className="text-white font-black text-4xl text-center my-10">
            {"Kiitos palautteestasi!"}
          </p>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
