import pickle
import numpy as np

#Loading ML files
popular_df=pickle.load(open("ml_models/popular.pkl","rb"))
pt=pickle.load(open("ml_models/pt.pkl",'rb'))
similarity_scores=pickle.load(open('ml_models/similarity_scores.pkl','rb'))
books=pickle.load(open("ml_models/books.pkl",'rb'))

print(popular_df.columns)

def recommend_books(book_name):
    #check if the book exists
    if book_name not in pt.index:
        return None
    
    #get index of searched book
    index=np.where(pt.index==book_name)[0][0]

    #get similarity scores
    similar_items=sorted(
        list(enumerate(similarity_scores[index])),
        key=lambda x: x[1],
        reverse=True
    )[1:9]

    recommendations=[]

    for item in similar_items:

        temp_df=books[books['Book-Title']==pt.index[item[0]]]
        temp_df=temp_df.drop_duplicates('Book-Title')

        recommendations.append(
            {
                "isbn": temp_df["ISBN"].values[0],
                "book_title":temp_df["Book-Title"].values[0],
                "book_author": temp_df["Book-Author"].values[0],
                "image_url": temp_df["Image-URL-M"].values[0],
                "publisher": temp_df["Publisher"].values[0]
            }
        )
    return recommendations

def get_top50_books():
    top_books=[]
    for _, row in popular_df.iterrows():

        top_books.append(
            {
            "ISBN":row["ISBN"],    
            "book_title": row["Book-Title"],
            "book_author": row["Book-Author"],
            "image_url": row["Image-URL-M"],
            "num_ratings": row["num_ratings"],
            "avg_rating": round(row["avg_rating"],2)
            }
        )
    return top_books
