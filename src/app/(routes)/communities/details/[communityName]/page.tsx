"use client";
import { getCommunityArticles } from "@/src/api/communities";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CommunityArticle {
  _id: string;
  community: string;
  title: string;
  content: string;
  meta_description: string;
  tags: string[];
  featured_image: string;
  author: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  is_published: boolean;
  created_by: number;
}

interface CommunityArticlesResponse {
  page: number;
  size: number;
  total: number;
  community: string;
  articles: CommunityArticle[];
}

export default function CommunityDetails({ params }: { params: { communityName: string } }) {
  const [articles, setArticles] = useState<CommunityArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const decodedName = decodeURIComponent(params.communityName);
        const response: CommunityArticlesResponse = await getCommunityArticles(decodedName);
        setArticles(response.articles);
      } catch (err) {
        setError('Failed to load community details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [params.communityName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No articles found for this community.</p>
      </div>
    );
  }

  const article = articles[0]; // Take the first article

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#141442] py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-5xl font-normal font-mono text-white mb-6 leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mt-11">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full max-h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-1 md:py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: article.content.replace(
                    /<h2>/g, 
                    '<h2 class="text-4xl font-normal my-6 font-mono text-gray-900 first:mt-0">'
                  ).replace(
                    /<p>/g, 
                    '<p class="text-sm  text-gray-700 mb-6 leading-relaxed">'
                  ).replace(
                    /<ul>/g, 
                    '<ul class="list-disc list-inside space-y-2 mb-6 text-sm text-gray-700">'
                  ).replace(
                    /<li>/g, 
                    '<li class="leading-relaxed">'
                  ).replace(
                    /<strong>/g, 
                    '<strong class="font-semibold text-gray-900">'
                  )
                }} 
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* View Properties Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-center">
                <button className="bg-[#D4B88C] text-white px-8 py-3 rounded-none font-medium hover:bg-[#C4A87C] transition-colors">
                  View Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
