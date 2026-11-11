import React, { useEffect, Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS } from '../data/tools';
import { ToolLayout } from '../components/layout/ToolLayout';
import { usePreferences } from '../context/UserPreferencesContext';

// Dynamic lazy imports so the browser only loads code for the active tool
const WordCounter = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.WordCounter })));
const CaseConverter = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.CaseConverter })));
const LoremIpsum = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.LoremIpsum })));
const SlugGenerator = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.SlugGenerator })));
const DuplicateRemover = lazy(() => import('../tools/engines/TextTools').then(m => ({ default: m.DuplicateRemover })));

const Base64Codec = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.Base64Codec })));
const JsonFormatter = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.JsonFormatter })));
const HashGenerator = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.HashGenerator })));
const UuidGenerator = lazy(() => import('../tools/engines/DevTools').then(m => ({ default: m.UuidGenerator })));

const PercentageCalculator = lazy(() => import('../tools/engines/CalcTools').then(m => ({ default: m.PercentageCalculator })));
const UnitConverter = lazy(() => import('../tools/engines/CalcTools').then(m => ({ default: m.UnitConverter })));
const LoanCalculator = lazy(() => import('../tools/engines/CalcTools').then(m => ({ default: m.LoanCalculator })));

const ColorConverter = lazy(() => import('../tools/engines/DesignTools').then(m => ({ default: m.ColorConverter })));
const BoxShadowGenerator = lazy(() => import('../tools/engines/DesignTools').then(m => ({ default: m.BoxShadowGenerator })));

const QrGenerator = lazy(() => import('../tools/engines/QrTools').then(m => ({ default: m.QrGenerator })));
const WifiQrGenerator = lazy(() => import('../tools/engines/QrTools').then(m => ({ default: m.WifiQrGenerator })));

const PomodoroTimer = lazy(() => import('../tools/engines/ProductivityTools').then(m => ({ default: m.PomodoroTimer })));
const Stopwatch = lazy(() => import('../tools/engines/ProductivityTools').then(m => ({ default: m.Stopwatch })));

const MetaTagGenerator = lazy(() => import('../tools/engines/SeoSocialTools').then(m => ({ default: m.MetaTagGenerator })));
const RobotsTxtGenerator = lazy(() => import('../tools/engines/SeoSocialTools').then(m => ({ default: m.RobotsTxtGenerator })));
const TweetSplitter = lazy(() => import('../tools/engines/SeoSocialTools').then(m => ({ default: m.TweetSplitter })));

const PasswordGenerator = lazy(() => import('../tools/engines/MoreProductivity').then(m => ({ default: m.PasswordGenerator })));
const RandomDice = lazy(() => import('../tools/engines/MoreProductivity').then(m => ({ default: m.RandomDice })));

const ImageCompressor = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageCompressor })));
const ImageResizer = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageResizer })));
const ImageFilters = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageFilters })));
const ImageToBase64 = lazy(() => import('../tools/engines/ImageTools').then(m => ({ default: m.ImageToBase64 })));

const TextToPdf = lazy(() => import('../tools/engines/PdfTools').then(m => ({ default: m.TextToPdf })));
const ImageToPdf = lazy(() => import('../tools/engines/PdfTools').then(m => ({ default: m.ImageToPdf })));
const PdfWatermarker = lazy(() => import('../tools/engines/PdfTools').then(m => ({ default: m.PdfWatermarker })));

const BmiCalculator = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.BmiCalculator })));
const DiscountCalculator = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.DiscountCalculator })));
const UnixTimestamp = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.UnixTimestamp })));
const CoinFlipper = lazy(() => import('../tools/engines/ExtendedTools').then(m => ({ default: m.CoinFlipper })));

const REGISTRY: Record<string, React.ReactNode> = {
  WordCounter: <WordCounter />,
  CaseConverter: <CaseConverter />,
  LoremIpsum: <LoremIpsum />,
  SlugGenerator: <SlugGenerator />,
  DuplicateRemover: <DuplicateRemover />,
  Base64Codec: <Base64Codec />,
  JsonFormatter: <JsonFormatter />,
  HashGenerator: <HashGenerator />,
  UuidGenerator: <UuidGenerator />,
  PercentageCalculator: <PercentageCalculator />,
  UnitConverter: <UnitConverter />,
  LoanCalculator: <LoanCalculator />,
  ColorConverter: <ColorConverter />,
  BoxShadowGenerator: <BoxShadowGenerator />,
  QrGenerator: <QrGenerator />,
  WifiQrGenerator: <WifiQrGenerator />,
  PomodoroTimer: <PomodoroTimer />,
  Stopwatch: <Stopwatch />,
  MetaTagGenerator: <MetaTagGenerator />,
  RobotsTxtGenerator: <RobotsTxtGenerator />,
  TweetSplitter: <TweetSplitter />,
  PasswordGenerator: <PasswordGenerator />,
  RandomDice: <RandomDice />,
  ImageCompressor: <ImageCompressor />,
  ImageResizer: <ImageResizer />,
  ImageFilters: <ImageFilters />,
  ImageToBase64: <ImageToBase64 />,
  TextToPdf: <TextToPdf />,
  ImageToPdf: <ImageToPdf />,
  PdfWatermarker: <PdfWatermarker />,
  BmiCalculator: <BmiCalculator />,
  DiscountCalculator: <DiscountCalculator />,
  UnixTimestamp: <UnixTimestamp />,
  CoinFlipper: <CoinFlipper />,
};

export const ToolHostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { recordToolUsage } = usePreferences();
  const tool = TOOLS.find((t) => t.slug === slug);

  useEffect(() => {
    if (tool) {
      document.title = tool.meta.title;
      recordToolUsage(tool.id);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold dark:text-white">Tool Not Found</h2>
        <Link to="/" className="text-brand-blue-600 underline mt-4 inline-block">Return to Directory</Link>
      </div>
    );
  }

  const Component = REGISTRY[tool.component] || <WordCounter />;
  return (
    <ToolLayout tool={tool}>
      <Suspense fallback={<div className="p-8 text-center text-xs font-semibold text-slate-600">Loading utility engine...</div>}>
        {Component}
      </Suspense>
    </ToolLayout>
  );
};