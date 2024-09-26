"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ExerciseSearchResults from "./ExerciseSearchResults";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface IExerciseFormSearchProps {
  form: any;
}

const ExerciseFormSearch = ({ form }: IExerciseFormSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const searchContainerRef = useRef(null);

  const query = searchParams.get("exercise");

  const [term, setTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setTerm("");
      }
    };

    setIsOpen(false);
    setTerm("");

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (term) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "exercise",
          value: term,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["exercise"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [term, searchParams, router, query]);

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-3xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          type="text"
          placeholder="Search for exercises"
          value={term}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-inherit shadow-none outline-none"
          onChange={(e) => {
            setTerm(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
        />
      </div>
      {isOpen && <ExerciseSearchResults form={form} setIsOpen={setIsOpen} setTerm={setTerm} />}
    </div>
  );
};

export default ExerciseFormSearch;
