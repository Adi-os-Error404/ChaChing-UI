export type CommentPost = {
  title: string;
  content: string;
};

export type CommentDetails = {
  id: number;
  title: string;
  content: string;
  createdOn: string;
  editedOn: string | null;
  username: string;
};

export type CommentFormInputs = {
  title: string;
  content: string;
};
