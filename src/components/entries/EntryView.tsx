"use client";

import React from "react";
import Image from "next/image";

interface EntryViewProps {
  title: string;
  date: string;
  content: string;
  coverImage?: string;
}

const EntryView = ({ title, date, content, coverImage }: EntryViewProps) => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="max-w-xl mx-auto text-center">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-2">
              <li>
                <a className="text-base font-medium text-gray-900" href="/">
                  Home
                </a>
              </li>

              <li>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-900 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <span className="ml-2 text-base font-medium text-gray-900">
                    Journal
                  </span>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-900 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <span className="ml-2 text-base font-medium text-gray-500">
                    {title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            <span className="text-base font-medium text-gray-900">
              Personal
            </span>
            <span className="text-base font-medium text-gray-500">•</span>
            <span className="text-base font-medium text-gray-500">
              {new Date(date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        {coverImage && (
          <div className="mt-8 sm:mt-12 lg:mt-16 aspect-w-16 aspect-h-9">
            <Image
              src={coverImage}
              alt="Cover Image"
              fill
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 mt-8 sm:mt-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-12 gap-y-8">
          {/* Social Icons Sidebar */}
          <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-6 lg:order-last">
            <ul className="flex space-x-3 lg:space-x-0 lg:space-y-4 lg:flex-col lg:items-center">
              {["discord", "twitter", "telegram", "linkedin"].map((icon, i) => (
                <li key={i}>
                  <button className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                    <span className="sr-only">{icon}</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Main Content */}
          <article className="prose lg:col-span-8 max-w-none prose-gray prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:lg:text-xl prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:border-gray-900 prose-blockquote:border-l-2 prose-blockquote:bg-gray-100 prose-blockquote:text-lg prose-blockquote:leading-8">
            {/* Convert content to HTML if needed */}

            <div
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n/g, "<br />"),
              }}
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default EntryView;
