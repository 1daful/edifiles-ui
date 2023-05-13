<template>
  <AwStepper :questions="branding"> </AwStepper>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import AwStepper from "../components/AwStepper.vue";
import AwLayout from "../components/AwLayout.vue";
import { QuestionType } from "../utils/types";
import {
  brandingOptions,
  domainNames,
  nicheOptions,
  projectOptions,
} from "../utils/model";

const questions: QuestionType[] = [
  {
    title: "Project Type",
    number: 1,
    content: [
      {
        question: "Pick a project to start with.",
        answer: "",
        options: projectOptions,
        action() {},
        name: "project",
      },
    ],
    icon: "",
    description: "",
  },
];

const branding: QuestionType[] = [
  {
    title: "Give a new a new look to your business",
    number: 1,
    content: [
      {
        question: "What is your business?",
        answer: "",
        inputType: "text",
        name: "bizName",
      },
    ],
    icon: "",
    description: "",
  },
  {
    title: "Pick one or more services you need below.",
    number: 2,
    content: [
      {
        question: "Choose one of the services below.",
        answer: "",
        //options: projectOptions,
        options: brandingOptions,
        name: "braingChoice",
      },
    ],
    icon: "",
    description: "",
  },
  {
    title: "Createa a new website",
    number: 3,
    content: [
      {
        question: "Choose your favourite niche.",
        answer: "",
        options: nicheOptions,
        name: "niche",
      },
    ],
    icon: "",
    description: "",
  },
];

const website: QuestionType[] = [
  {
    title: "Createa a new website",
    number: 2,
    content: [
      {
        question: "Choose your favourite niche.",
        answer: "",
        options: nicheOptions,
        name: "niche",
      },
    ],
    icon: "",
    description: "",
  },
  {
    title: "Finishing touch",
    number: 3,
    content: [
      {
        question: "Pick a layout option",
        inputType: "text",
        component: AwLayout,
        answer: "",
        name: "layout",
      },
      {
        question: "Name of website",
        inputType: "text",
        answer: "",
        options: [],
        name: "siteName",
      },
      {
        question: "Input the base url",
        inputType: "text",
        answer: "",
        options: domainNames,
        name: "url",
      },
      {
        question: "Logo",
        inputType: "file",
        //component: QImg
        answer: "",
        options: [],
        name: "logo",
      },
    ],
    icon: "",
    description: "",
  },
];

const domain: QuestionType[] = [
  {
    title: "Let's start with a name",
    number: 1,
    content: [
      {
        question: "Enter a name below or use the name generator",
        answer: "",
        inputType: "text",
        name: "bizName",
      },
      {
        question: "Generate a good business name",
        answer: "",
        component: AwLayout,
        name: "bizName",
      },
    ],
    icon: "",
    description: "",
  },
];

onMounted(() => {
  console.log("form ", branding);
});
</script>
