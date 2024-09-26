"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { bodyParts, equipmentCategories } from "@/constants";
import Image from "next/image";
import ExerciseFormSearch from "../shared/search/ExerciseFormSearch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { createRoutine } from "@/lib/actions/routine.action";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(150),
  muscleGroups: z.array(z.string().min(1).max(15)).min(1).max(5),
  equipment: z.array(z.string().min(1).max(25)).max(2),
  exercises: z
    .array(
      z.object({
        mongoId: z.string().min(1).max(50),
        name: z.string().min(1).max(50),
        sets: z.number().min(1),
        reps: z.number().min(1),
        rest: z.number().min(1).max(300),
      })
    )
    .min(1),
  // time: z.number().min(1),
});

interface IRoutineFormProps {
  mongoUserId: string;
}

export default function ProfileForm({ mongoUserId }: IRoutineFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      muscleGroups: [],
      equipment: [],
      exercises: [],
      // time: 0,
    },
  });

  
  // description: "this is a test",
  // equipment: ['freeweights']
  // exercises: [ 
  //    {mongoId: '65b6774ccc4472d4e73ffab3', name: 'barbell bench press', sets: 3, reps: 10, rest: 90},
  //    {mongoId: '65b6774ccc4472d4e73ffc6f', name: 'dumbbell incline shoulder raise', sets: 5, reps: 12, rest: 60},
  // ];
  // muscleGroups: ['chest', 'shoulders'],
  // title: 'Testing'

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const { title, description, muscleGroups, equipment, exercises } = values;
      // console.log(exercises[0].mongoId);
      await createRoutine({
        title,
        description,
        targetedMuscleGroups: muscleGroups,
        equipmentNeeded: equipment,
        exercises: exercises.map((exercise) => ({
          exercise: JSON.parse(JSON.stringify(exercise.mongoId)),
          sets: exercise.sets,
          reps: exercise.reps,
          rest: exercise.rest,
        })),
        author: JSON.parse(mongoUserId),
        path: "/routine"
      });

      router.push("/routine");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-full space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Title <span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[100px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="muscleGroups"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Muscle Groups
                </FormLabel>
                <FormDescription className="body-regular text-light-500">
                  Select the muscle groups that this routine targets.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {bodyParts.map((item, i) => (
                  <FormField
                    key={i}
                    control={form.control}
                    name="muscleGroups"
                    render={({ field }) => {
                      const selected = field.value?.includes(item.id);

                      return (
                        <FormControl>
                          <FormItem
                            key={i}
                            className={`${selected ? "bg-green-300" : ""} light-border-2 flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3`}
                            onClick={() => {
                              if (selected) {
                                field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                              } else {
                                field.onChange([...field.value, item.id]);
                              }
                            }}
                          >
                            <div className="flex flex-col gap-4">
                              <FormLabel
                                className={`h2-semibold text-dark-400 ${selected ? "" : "dark:text-light-800"}`}
                              >
                                {item.label}
                              </FormLabel>
                              <div className="flex gap-2">
                                {selected ? (
                                  <Image
                                    src="/assets/icons/remove.svg"
                                    alt="remove icon"
                                    width={20}
                                    height={20}
                                    className={`invert-0 ${selected ? "" : "dark:invert"}`}
                                  />
                                ) : (
                                  <Image
                                    src="/assets/icons/add.svg"
                                    alt="remove icon"
                                    width={20}
                                    height={20}
                                    className={`invert-0 ${selected ? "" : "dark:invert"}`}
                                  />
                                )}
                                <p
                                  className={`text-dark-400 ${selected ? "" : "dark:text-light-800"}`}
                                >
                                  {selected ? "Deselect" : "Select"}
                                </p>
                              </div>
                            </div>
                            <Image
                              src="/assets/icons/gym.svg"
                              width={30}
                              height={30}
                              alt="muscle group icon"
                              className={`invert-0 ${selected ? "" : "dark:invert"}`}
                            />
                          </FormItem>
                        </FormControl>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Equipment
                </FormLabel>
                <FormDescription className="body-regular text-light-500">
                  Select the equipment that is required for this routine.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {equipmentCategories.map((item, i) => (
                  <FormField
                    key={i}
                    control={form.control}
                    name="equipment"
                    render={({ field }) => {
                      const selected = field.value?.includes(item.id);

                      return (
                        <FormControl>
                          <FormItem
                            key={i}
                            className={`${selected ? "bg-green-300" : ""} light-border-2 flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3`}
                            onClick={() => {
                              if (selected) {
                                field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                              } else {
                                field.onChange([...field.value, item.id]);
                              }
                            }}
                          >
                            <div className="flex flex-col gap-4">
                              <FormLabel
                                className={`h2-semibold text-dark-400 ${selected ? "" : "dark:text-light-800"}`}
                              >
                                {item.label}
                              </FormLabel>

                              <div className="flex gap-2">
                                {selected ? (
                                  <Image
                                    src="/assets/icons/remove.svg"
                                    alt="remove icon"
                                    width={20}
                                    height={20}
                                    className={`invert-0 ${selected ? "" : "dark:invert"}`}
                                  />
                                ) : (
                                  <Image
                                    src="/assets/icons/add.svg"
                                    alt="remove icon"
                                    width={20}
                                    height={20}
                                    className={`invert-0 ${selected ? "" : "dark:invert"}`}
                                  />
                                )}
                                <p
                                  className={`text-dark-400 ${selected ? "" : "dark:text-light-800"}`}
                                >
                                  {selected ? "Deselect" : "Select"}
                                </p>
                              </div>
                            </div>
                            <Image
                              src="/assets/icons/gym.svg"
                              width={30}
                              height={30}
                              alt="muscle group icon"
                              className={`invert-0 ${selected ? "" : "dark:invert"}`}
                            />
                          </FormItem>
                        </FormControl>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exercises"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Exercises
              </FormLabel>
              <FormDescription className="body-regular text-light-500">
                Add the exercises that make up this routine.
              </FormDescription>
              <ExerciseFormSearch form={form} />
              <Table>
                {field.value?.length === 0 && (
                  <TableCaption>
                    Exercises you have added will appear here.
                  </TableCaption>
                )}
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Sets</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Rest</TableHead>
                    <TableHead>Remove</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {field.value?.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="capitalize">{item.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.sets}
                          onChange={(e) => {
                            field.onChange(
                              field.value?.map((value) =>
                                value.mongoId === item.mongoId
                                  ? { ...value, sets: Number(e.target.value) }
                                  : value
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.reps}
                          onChange={(e) => {
                            field.onChange(
                              field.value?.map((value) =>
                                value.mongoId === item.mongoId
                                  ? { ...value, reps: Number(e.target.value) }
                                  : value
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.rest}
                          onChange={(e) => {
                            field.onChange(
                              field.value?.map((value) =>
                                value.mongoId === item.mongoId
                                  ? { ...value, rest: Number(e.target.value) }
                                  : value
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Image
                          src="/assets/icons/remove.svg"
                          alt="remove exercise"
                          width={20}
                          height={20}
                          className="cursor-pointer invert-0 dark:invert"
                          onClick={() => {
                            field.onChange(
                              field.value?.filter(
                                (value) => value.mongoId !== item.mongoId
                              )
                            );
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end mt-5">
          <Button
            type="submit"
            className="bg-primary-500 w-fit text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Workout Routine"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
