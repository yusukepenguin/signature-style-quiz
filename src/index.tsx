
// Signature Style Quiz Logic V2: Parameter-based with multiple selections and comments

// --- Data Structures ---

type LineWeight = '細い' | '普通' | '太い';
type Style = '曲線的' | '直線的' | '幾何学的' | 'カリグラフィ風' | '抽象的';
type Complexity = 'シンプル' | 'バランス型' | '装飾的';
type Impression = 'エレガント' | 'モダン' | 'クラシック' | 'クリエイティブ' | 'ミニマリスト' | '力強い' | '繊細';

interface SignatureParameters {
    lineWeight: LineWeight;
    style: Style;
    complexity: Complexity;
    impressions: Impression[]; // Can have multiple impressions
}

interface SignatureSample {
    id: string;
    name: string;
    path: string; // Updated to use local paths
    parameters: SignatureParameters;
}

interface QuizStep {
    questionText: string;
    subText?: string;
    sampleIds: string[];
    maxSelections?: number; // Optional: Max number of selections allowed for this step
}

interface UserSelection {
    sampleId: string;
    comment?: string;
}

interface UserAnswerForStep {
    stepIndex: number;
    selections: UserSelection[];
}

// --- Sample Data ---

const SIGNATURE_SAMPLES: SignatureSample[] = [
    { id: 'S1', name: '流麗な筆記体', path: '/assets/images/S1.jpg', parameters: { lineWeight: '普通', style: '曲線的', complexity: 'バランス型', impressions: ['エレガント', 'クラシック'] } },
    { id: 'S2', name: 'シャープな直線サイン', path: '/assets/images/S2.jpg', parameters: { lineWeight: '細い', style: '直線的', complexity: 'シンプル', impressions: ['モダン', 'ミニマリスト'] } },
    { id: 'S3', name: '芸術的な模様', path: '/assets/images/S3.jpg', parameters: { lineWeight: '普通', style: '抽象的', complexity: '装飾的', impressions: ['クリエイティブ', 'エレガント'] } },
    { id: 'S4', name: '伝統的なイニシャル', path: '/assets/images/S4.jpg', parameters: { lineWeight: '太い', style: 'カリグラフィ風', complexity: 'バランス型', impressions: ['クラシック', '力強い'] } },
    { id: 'S5', name: '現代的な太字ロゴ風', path: '/assets/images/S5.jpg', parameters: { lineWeight: '太い', style: '幾何学的', complexity: 'シンプル', impressions: ['モダン', '力強い'] } },
    { id: 'S6', name: 'シンプルなラインアート', path: '/assets/images/S6.jpg', parameters: { lineWeight: '細い', style: '直線的', complexity: 'シンプル', impressions: ['ミニマリスト', 'モダン'] } },
    { id: 'S7', name: '優雅な花文字', path: '/assets/images/S7.jpg', parameters: { lineWeight: '普通', style: '曲線的', complexity: '装飾的', impressions: ['エレガント', '繊細'] } },
    { id: 'S8', name: 'ユニークな抽象フォルム', path: '/assets/images/S8.jpg', parameters: { lineWeight: '普通', style: '抽象的', complexity: 'バランス型', impressions: ['クリエイティブ', 'モダン'] } },
    { id: 'S9', name: '重厚な万年筆風', path: '/assets/images/S9.jpg', parameters: { lineWeight: '太い', style: 'カリグラフィ風', complexity: 'バランス型', impressions: ['クラシック', '力強い', 'エレガント'] } },
    { id: 'S10', name: '極細線のミニマルデザイン', path: '/assets/images/S10.jpg', parameters: { lineWeight: '細い', style: '直線的', complexity: 'シンプル', impressions: ['ミニマリスト', '繊細'] } },
    { id: 'S11', name: '伸びやかなカリグラフィ', path: '/assets/images/S11.jpg', parameters: { lineWeight: '普通', style: 'カリグラフィ風', complexity: 'バランス型', impressions: ['エレガント', 'クリエイティブ'] } },
    { id: 'S12', name: '都会的なロゴタイプ', path: '/assets/images/S12.jpg', parameters: { lineWeight: '太い', style: '幾何学的', complexity: 'シンプル', impressions: ['モダン', '力強い'] } },
    { id: 'S13', name: '軽快なループサイン', path: '/assets/images/S13.jpg', parameters: { lineWeight: '細い', style: '曲線的', complexity: 'バランス型', impressions: ['クリエイティブ', 'エレガント', '繊細'] } },
    { id: 'S14', name: '大胆な一筆書き風', path: '/assets/images/S14.jpg', parameters: { lineWeight: '太い', style: '抽象的', complexity: 'シンプル', impressions: ['モダン', '力強い', 'クリエイティブ'] } },
    { id: 'S15', name: '緻密な装飾サイン', path: '/assets/images/S15.jpg', parameters: { lineWeight: '細い', style: '曲線的', complexity: '装飾的', impressions: ['エレガント', 'クラシック', '繊細'] } },
    { id: 'S16', name: '幾何学模様の組み合わせ', path: '/assets/images/S16.jpg', parameters: { lineWeight: '普通', style: '幾何学的', complexity: 'バランス型', impressions: ['モダン', 'クリエイティブ'] } },
];

const QUIZ_STEPS: QuizStep[] = [
    { questionText: "ステップ1: これらのサインから好みのものを全て選んでください。", subText: "直感でピンと来たものを選んでみましょう！コメントも歓迎です。", sampleIds: ['S1', 'S2', 'S3', 'S4'], maxSelections: 3 },
    { questionText: "ステップ2: 次のサイン群です。気になるものはありますか？", subText: "細部や全体の雰囲気など、自由に評価してください。", sampleIds: ['S5', 'S6', 'S7', 'S8'], maxSelections: 3 },
    { questionText: "ステップ3: 最後のサイン群です！あなたの好みは？", subText: "これまでの選択と違っても構いません。自由にどうぞ！", sampleIds: ['S9', 'S10', 'S11', 'S12'], maxSelections: 3 },
    { questionText: "ステップ4: もう少し見てみましょう。どんなサインに惹かれますか？", subText: "あなたの個性を表現するサインを見つけましょう。", sampleIds: ['S13', 'S14', 'S15', 'S16'], maxSelections: 3 },
];


// --- State ---
let currentStepIndex = 0;
let userAnswers: UserAnswerForStep[] = [];
let currentSelections = new Map<string, string | undefined>(); // sampleId -> comment


// --- DOM Elements ---
const screens = {
    start: document.getElementById('start-screen')!,
    quiz: document.getElementById('quiz-screen')!,
    result: document.getElementById('result-screen')!,
};
const startButton = document.getElementById('start-button')!;
const progressText = document.getElementById('progress-text')!;
const quizQuestionText = document.getElementById('quiz-question-text')!;
const quizSubText = document.querySelector('.quiz-sub-text') as HTMLElement;
const imageSelectionGrid = document.getElementById('image-selection-grid')!;
const nextQuestionButton = document.getElementById('next-question-button')!;
const resultTitle = document.getElementById('result-title')!;
const resultSummaryContainer = document.getElementById('result-summary')!;
const userCommentsSection = document.getElementById('user-comments-section')!;
const userCommentsList = document.getElementById('user-comments-list')!;
const recommendedSamplesContainer = document.getElementById('recommended-samples')!;
const restartButton = document.getElementById('restart-button')!;

// --- Functions ---

function showScreen(screenId: 'start' | 'quiz' | 'result'): void {
    (Object.keys(screens) as Array<keyof typeof screens>).forEach(key => {
        screens[key].classList.remove('active');
    });
    screens[screenId].classList.add('active');
}

function getSampleById(id: string): SignatureSample | undefined {
    return SIGNATURE_SAMPLES.find(sample => sample.id === id);
}

function displayStep(): void {
    if (currentStepIndex >= QUIZ_STEPS.length) {
        calculateAndDisplayResult();
        return;
    }

    currentSelections.clear();
    const step = QUIZ_STEPS[currentStepIndex];
    progressText.textContent = `ステップ ${currentStepIndex + 1} / ${QUIZ_STEPS.length}`;
    quizQuestionText.textContent = step.questionText;
    if (step.subText && quizSubText) {
      quizSubText.textContent = step.subText;
      quizSubText.style.display = 'block';
    } else if (quizSubText) {
      quizSubText.style.display = 'none';
    }


    imageSelectionGrid.innerHTML = ''; // Clear previous images

    step.sampleIds.forEach(sampleId => {
        const sample = getSampleById(sampleId);
        if (sample) {
            const card = document.createElement('div');
            card.className = 'image-card';
            card.dataset.sampleId = sample.id;
            card.setAttribute('role', 'checkbox');
            card.setAttribute('aria-checked', 'false');
            card.tabIndex = 0;

            const img = document.createElement('img');
            img.src = sample.path;
            img.alt = `サインサンプル: ${sample.name}`;
            
            const caption = document.createElement('p');
            caption.className = 'image-card-caption';
            caption.textContent = sample.name;

            const commentInput = document.createElement('textarea');
            commentInput.className = 'comment-input';
            commentInput.placeholder = 'コメント (任意)';
            commentInput.setAttribute('aria-label', `${sample.name}へのコメント`);
            commentInput.dataset.sampleId = sample.id; // For associating comment

            // Stop card selection when typing in textarea
            commentInput.addEventListener('click', (e) => e.stopPropagation());
            commentInput.addEventListener('keydown', (e) => e.stopPropagation());


            card.appendChild(img);
            card.appendChild(caption);
            card.appendChild(commentInput);
            imageSelectionGrid.appendChild(card);

            card.addEventListener('click', () => toggleSelection(card, sample.id, step.maxSelections));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleSelection(card, sample.id, step.maxSelections);
                }
            });
        }
    });
    showScreen('quiz');
}

function toggleSelection(cardElement: HTMLElement, sampleId: string, maxSelections?: number): void {
    const isSelected = cardElement.classList.contains('selected');
    const commentInput = cardElement.querySelector('.comment-input') as HTMLTextAreaElement;

    if (isSelected) {
        cardElement.classList.remove('selected');
        cardElement.setAttribute('aria-checked', 'false');
        currentSelections.delete(sampleId);
    } else {
        if (maxSelections && currentSelections.size >= maxSelections) {
            // Optional: Provide feedback that max selections reached
            alert(`最大${maxSelections}つまで選択できます。`);
            return;
        }
        cardElement.classList.add('selected');
        cardElement.setAttribute('aria-checked', 'true');
        currentSelections.set(sampleId, commentInput.value.trim()); // Store with current comment
    }
}


function handleNextStep(): void {
    window.scrollTo(0, 0); // Scroll to top
    // Finalize comments for selected items before moving to next step
    currentSelections.forEach((_comment, sampleId) => {
        const card = imageSelectionGrid.querySelector(`.image-card[data-sample-id="${sampleId}"]`);
        if (card && card.classList.contains('selected')) { // Ensure it's still selected
            const commentInput = card.querySelector('.comment-input') as HTMLTextAreaElement;
            if (commentInput) {
                currentSelections.set(sampleId, commentInput.value.trim());
            }
        } else if (!card || !card.classList.contains('selected')) {
             currentSelections.delete(sampleId); // Remove if deselected somehow or card gone
        }
    });
    
    const selectionsForStep: UserSelection[] = [];
    currentSelections.forEach((comment, sampleId) => {
        selectionsForStep.push({ sampleId, comment: comment || undefined });
    });

    if (selectionsForStep.length === 0 && QUIZ_STEPS[currentStepIndex]?.maxSelections !== 0) {
      // Optional: Prevent proceeding if no selection made, unless maxSelections is explicitly 0 (allowing skipping)
      // alert("少なくとも1つは選択してください。");
      // return;
    }

    userAnswers.push({
        stepIndex: currentStepIndex,
        selections: selectionsForStep
    });

    currentStepIndex++;
    displayStep();
}

function calculateAndDisplayResult(): void {
    window.scrollTo(0, 0); // Scroll to top
    const parameterCounts: {
        lineWeight: Record<LineWeight, number>,
        style: Record<Style, number>,
        complexity: Record<Complexity, number>,
        impressions: Record<Impression, number>
    } = {
        lineWeight: { '細い': 0, '普通': 0, '太い': 0 },
        style: { '曲線的': 0, '直線的': 0, '幾何学的': 0, 'カリグラフィ風': 0, '抽象的': 0 },
        complexity: { 'シンプル': 0, 'バランス型': 0, '装飾的': 0 },
        impressions: { 'エレガント': 0, 'モダン': 0, 'クラシック': 0, 'クリエイティブ': 0, 'ミニマリスト': 0, '力強い': 0, '繊細': 0 }
    };

    const allComments: {sampleName: string, comment: string}[] = [];

    userAnswers.forEach(answerStep => {
        answerStep.selections.forEach(selection => {
            const sample = getSampleById(selection.sampleId);
            if (sample) {
                parameterCounts.lineWeight[sample.parameters.lineWeight]++;
                parameterCounts.style[sample.parameters.style]++;
                parameterCounts.complexity[sample.parameters.complexity]++;
                sample.parameters.impressions.forEach(imp => {
                    parameterCounts.impressions[imp]++;
                });
                if (selection.comment && selection.comment.trim() !== '') {
                    allComments.push({sampleName: sample.name, comment: selection.comment});
                }
            }
        });
    });

    // Generate result summary
    resultSummaryContainer.innerHTML = '<h3>あなたの好みの傾向</h3>';
    
    function getTopN(paramRecord: Record<string, number>, n: number = 2, defaultText: string = "様々"): string[] {
      const sorted = Object.entries(paramRecord)
          .sort(([, a], [, b]) => b - a)
          .filter(([, count]) => count > 0);
      
      if (sorted.length === 0) return [defaultText];
      return sorted.slice(0, n).map(([key]) => key);
    }

    const topWeights = getTopN(parameterCounts.lineWeight, 1, "特定なし");
    resultSummaryContainer.innerHTML += `<p><strong>線の太さ:</strong> あなたは主に「${topWeights.join('」「')}」の線を好むようです。</p>`;
    

    const topStyles = getTopN(parameterCounts.style, 2, "様々な");
    resultSummaryContainer.innerHTML += `<p><strong>スタイル:</strong> 「${topStyles.join('」「')}」といったスタイルに惹かれる傾向があります。</p>`;

    const topComplexities = getTopN(parameterCounts.complexity, 1, "バランスの取れた");
    resultSummaryContainer.innerHTML += `<p><strong>複雑さ:</strong> 「${topComplexities.join('」「')}」なデザインを好むかもしれません。</p>`;
    
    const topImpressions = getTopN(parameterCounts.impressions, 3, "多彩な");
    if (topImpressions.length > 0 && topImpressions[0] !== "多彩な") {
        resultSummaryContainer.innerHTML += `<p><strong>印象:</strong> 全体的に「${topImpressions.join('」「')}」といった印象のサインがお好みのようです。</p>`;
    } else {
        resultSummaryContainer.innerHTML += `<p>あなたの好みは多岐にわたるか、または特定の傾向が強くないようです！さらに多くのサンプルを見ることで、より具体的な傾向が見つかるかもしれません。</p>`;
    }


    // Display comments
    if (allComments.length > 0) {
        userCommentsList.innerHTML = '';
        allComments.forEach(c => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${c.sampleName}:</strong> ${c.comment.replace(/\n/g, '<br>')}`; // Display newlines in comments
            userCommentsList.appendChild(li);
        });
        userCommentsSection.style.display = 'block';
    } else {
        userCommentsSection.style.display = 'none';
    }

    // Display recommended samples (simple logic: show samples matching top 1-2 impressions)
    recommendedSamplesContainer.innerHTML = '';
    const recommendedToShow = new Set<SignatureSample>();
    
    if (topImpressions.length > 0 && topImpressions[0] !== "多彩な") {
        SIGNATURE_SAMPLES.forEach(sample => {
            if (recommendedToShow.size < 4 && sample.parameters.impressions.some(imp => topImpressions.includes(imp))) {
                const alreadySelected = userAnswers.some(step => step.selections.some(sel => sel.sampleId === sample.id));
                if (!alreadySelected || SIGNATURE_SAMPLES.length < 8) { 
                     recommendedToShow.add(sample);
                }
            }
        });
    }
    // Fallback if no impression match or too few, try to fill up to 4
    if (recommendedToShow.size < 4) {
        const otherSamples = SIGNATURE_SAMPLES.filter(s => !recommendedToShow.has(s) && !userAnswers.some(step => step.selections.some(sel => sel.sampleId === s.id)));
        otherSamples.sort(() => 0.5 - Math.random()) 
                    .slice(0, 4 - recommendedToShow.size)
                    .forEach(s => recommendedToShow.add(s));
    }
     // If still not enough, add any remaining samples randomly
    if (recommendedToShow.size < 4) {
        const remainingSamples = SIGNATURE_SAMPLES.filter(s => !recommendedToShow.has(s));
        remainingSamples.sort(() => 0.5 - Math.random())
                        .slice(0, 4 - recommendedToShow.size)
                        .forEach(s => recommendedToShow.add(s));
    }


    recommendedToShow.forEach(sample => {
        const card = document.createElement('div');
        card.className = 'image-card recommended-item'; // Added a class for potential specific styling

        const img = document.createElement('img');
        img.src = sample.path;
        img.alt = `おすすめサイン: ${sample.name}`;
        img.setAttribute('aria-label', `おすすめサンプル: ${sample.name} (${sample.parameters.impressions.join(', ')})`);
        
        const caption = document.createElement('p');
        caption.className = 'image-card-caption';
        caption.textContent = sample.name;

        card.appendChild(img);
        card.appendChild(caption);
        recommendedSamplesContainer.appendChild(card);
    });

    showScreen('result');
}


function startQuiz(): void {
    window.scrollTo(0, 0); // Scroll to top
    currentStepIndex = 0;
    userAnswers = [];
    currentSelections.clear();
    // Reset result screen content
    resultSummaryContainer.innerHTML = '<h3>あなたの好みの傾向</h3>';
    userCommentsList.innerHTML = '';
    userCommentsSection.style.display = 'none';
    recommendedSamplesContainer.innerHTML = '';

    displayStep();
}

function initializeApp(): void {
    startButton.addEventListener('click', startQuiz);
    nextQuestionButton.addEventListener('click', handleNextStep);
    restartButton.addEventListener('click', startQuiz);
    
    showScreen('start');
}

// Initialize the application
initializeApp();
