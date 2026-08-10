// JavaScriptが読み込まれた確認
console.log("My Archive Start!");

// タイトル変更
const title = document.getElementById("title");

// titleが存在するときだけ変更
if(title){
    title.textContent = "✨ My Archive ✨";
}

// NOW LOADINGの文字
const loadingText = document.getElementById("loadingText");
// ドットの数
let dots = "";

// 0.5秒ごとに実行
setInterval(function(){

    if(dots === "..."){
        dots = "";
    }else{
        dots += ".";
    }

    loadingText.textContent = "NOW LOADING" + dots;
},500);





// ローディング画面を取得
const loading = document.getElementById("loading");

// 2秒後に消す
setTimeout(function(){
    loading.classList.add("hide");
},2000);

setTimeout(function(){
    loading.style.display = "none";
},3000);




// すべてのカードを取得
const cards = document.querySelectorAll(".card");

// 1枚ずつ表示
cards.forEach(function(card,index){
    setTimeout(function(){
        card.classList.add("show");
    },3000 + index*300);
});



// =========================
// キラキラを作る
// =========================
function createSparkle(x, y){

    // divを作る
    const sparkle = document.createElement("div");

    // sparkleクラスを付ける
    sparkle.classList.add("sparkle");

    // 位置
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    // 大きさ
    const size = Math.random() * 6 + 4;

    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";

    // 追加
    document.body.appendChild(sparkle);

    // 6秒後に削除
    setTimeout(function(){

        sparkle.remove();

    },6000);

}



// =========================
// 泡を作る
// =========================
function createBubble(){

    // divを作る
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");


    // ランダムな横位置
    const x = Math.random() * window.innerWidth;
    bubble.style.left = x + "px";
    bubble.style.top = "100vh";

    // 大きさ
    const size = Math.random() * 30 + 15;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.animationDuration = (6 + Math.random() * 4) + "s";

    // 画面へ追加
    document.body.appendChild(bubble);


    // -------------------------
    // 泡の近くにキラキラ
    // -------------------------

    const count = Math.floor(Math.random() * 3);
    for(let i = 0; i < count; i++){
        createSparkle(
            x + Math.random()*30 - 15,
            window.innerHeight - Math.random()*40
        );

    }


    // 泡を消す
    setTimeout(function(){

        bubble.remove();

    },8000);

}



// =========================
// 一定時間ごとに実行
// =========================
setInterval(createBubble,1400);


// 音楽プレイヤー取得
const audios = document.querySelectorAll("audio");
// 全てのaudioを見る
audios.forEach(function(audio){
    // 再生した時
    audio.addEventListener("play",function(){
        const card =
        audio.closest(".album-card");
        card.classList.add("playing");
    });

    // 停止した時
    audio.addEventListener("pause",function(){
        const card =
        audio.closest(".album-card");
        card.classList.remove("playing");
    });

});



// 思い出ボタン
const buttons =
document.querySelectorAll(".memory-button");
buttons.forEach(function(button){
    button.addEventListener("click",function(){
        const memory =
        button.nextElementSibling;
        if(memory.style.display === "block"){
            memory.style.display="none";
            button.textContent="💭 思い出を見る";
        }else{
            memory.style.display="block";
            button.textContent="📖 閉じる";
        }
    });
});





// ========================================
// My Kitchen
// 料理追加フォームを表示する
// ========================================

// 「新しい料理を記録する」ボタンを探す
const addRecipeButton =
    document.querySelector(".add-recipe-button");

// 料理追加フォームを探す
const recipeForm =
    document.querySelector("#recipeForm");


// ボタンがクリックされたとき
addRecipeButton.addEventListener("click", function () {

    // フォームを表示する
    recipeForm.style.display = "block";

});




// ========================================
// My Kitchen
// 1食あたりの値段を自動計算
// ========================================


// 材料費の入力欄を取得
const recipePrice =
    document.querySelector("#recipePrice");

// 食数の入力欄を取得
const recipeServings =
    document.querySelector("#recipeServings");

// 計算結果を表示する場所を取得
const pricePerMeal =
    document.querySelector("#pricePerMeal");


// 材料費が入力されたとき
recipePrice.addEventListener("input", calculatePrice);


// 食数が入力されたとき
recipeServings.addEventListener("input", calculatePrice);



// ========================================
// 1食あたりの値段を計算する関数
// ========================================

function calculatePrice() {

    // 入力された材料費を数字に変換
    const price =
        Number(recipePrice.value);


    // 入力された食数を数字に変換
    const servings =
        Number(recipeServings.value);


    // 材料費と食数の両方が入力されているか確認
    if (price > 0 && servings > 0) {

        // 1食あたりの値段を計算
        const result =
            Math.round(price / servings);


        // HTMLに計算結果を表示
        pricePerMeal.textContent =
            "¥ " + result;

    }

    else {
        // 入力が足りない場合
        pricePerMeal.textContent =
            "¥ -";
    }

}




// ========================================
// My Kitchen
// 料理を保存する
// ========================================


// 「保存する」ボタンを取得
const saveRecipeButton =
    document.querySelector("#saveRecipeButton");

// 料理カードを追加する場所を取得
const recipeCards =
    document.querySelector("#recipeCards");

// 保存ボタンがクリックされたら
saveRecipeButton.addEventListener("click", saveRecipe);


// ========================================
// My Kitchen
// 料理を保存する
// ========================================

function saveRecipe() {

    // --------------------------------
    // 入力された情報を取得
    // --------------------------------

    // 料理名
    const name =
        document.querySelector("#recipeName").value;

    // 作った日
    const date =
        document.querySelector("#recipeDate").value;

    // 食事の種類
    const mealType =
        document.querySelector(
            "#mealType"
        ).value;

    // 分類
    const category =
        document.querySelector("#recipeCategory").value;

    // 材料費
    const price =
        Number(
            document.querySelector("#recipePrice").value
        );

    // 何食分か
    const servings =
        Number(
            document.querySelector("#recipeServings").value
        );

    // 総合評価
    const rating =
        Number(
            document.querySelector("#recipeRating").value
        );

    // メモ
    const memo =
        document.querySelector("#recipeMemo").value;

    // --------------------------------
    // 選択された料理写真を取得
    // --------------------------------
    const imageFile =
        document.querySelector("#recipeImage").files[0];

    // --------------------------------
    // 入力チェック
    // --------------------------------

    // 料理名が空の場合
    if (name === "") {
        alert("料理名を入力してください！");
        return;
    }
    // 日付が空の場合
    if (date === "") {
        alert("作った日を入力してください！");
        return;
    }

    if (mealType === "") {

    alert("朝・昼・晩・間食を選んでください！");

    return;
    }

    // 材料費が0以下の場合
    if (price <= 0) {
        alert("材料費を入力してください！");
        return;
    }


    // 食数が0以下の場合
    if (servings <= 0) {
        alert("何食分か入力してください！");
        return;
    }

    // --------------------------------
    // 1食あたりの値段を計算
    // --------------------------------
    const pricePerMeal =
        Math.round(price / servings);

    // --------------------------------
    // 料理データを1つの箱にまとめる
    // --------------------------------

    const recipe = {
        // --------------------------------
        // この料理専用のID
        // // --------------------------------
        id: Date.now(),
        // 料理名
        name: name,
        // 作った日
        date: date,
        // 分類
        category: category,
        // 材料費
        price: price,
        // 食数
        servings: servings,
        // 1食あたり
        pricePerMeal: pricePerMeal,
        // 評価
        rating: rating,
        // メモ
        memo: memo,
        // 写真
        image: null
    };

    // --------------------------------
    // 写真が選択されていた場合
    // --------------------------------
    if (imageFile) {

        // 写真を読み込む
        const reader =
            new FileReader();

        // 読み込みが終わったら
        reader.onload = function() {

            // 写真データを保存
            recipe.image =
                reader.result;
            // 料理を保存
            saveRecipeData(recipe);
        };

        // 写真を読み込む
        reader.readAsDataURL(imageFile);
        // ここで一旦終了
        return;
    }

    // 写真がない場合
    saveRecipeData(recipe);

}


// ========================================
// 料理データを保存する
// ========================================

function saveRecipeData(recipe) {

    // --------------------------------
    // 今まで保存していた料理を取得
    // --------------------------------

    let recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];


    // --------------------------------
    // 新しい料理を追加
    // --------------------------------

    recipes.push(recipe);


    // --------------------------------
    // localStorageに保存
    // --------------------------------

    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)
    );


    // --------------------------------
    // 画面を更新
    // --------------------------------
    displayRecipes();

    updateKitchenStats();

    updateFoodChart();

    updateCookingLevel();

    updateMealOptions();

    displayMeals();

    updateAverageMealPrice();
    // --------------------------------
    // フォームをリセット
    // --------------------------------
    document.querySelector(
        "#recipeName"
    ).value = "";

    document.querySelector(
        "#recipeDate"
    ).value = "";

    document.querySelector(
        "#recipePrice"
    ).value = "";

    document.querySelector(
        "#recipeServings"
    ).value = "";

    document.querySelector(
        "#recipeMemo"
    ).value = "";

    // 写真欄をリセット
    document.querySelector(
        "#recipeImage"
    ).value = "";

    // 写真プレビューを消す
    document.querySelector(
        "#imagePreview"
    ).innerHTML = "";

    // 1食あたりをリセット
    document.querySelector(
        "#pricePerMeal"
    ).textContent = "¥ -";

    // 保存完了
    alert("料理を記録しました！");

}


// ========================================
// 保存されている料理を画面に表示する
// ========================================

function displayRecipes(showAll = false) {

    // 料理カードを入れる場所
    const recipeCards =
        document.querySelector("#recipeCards");


    // 一度カードを空にする
    recipeCards.innerHTML = "";

    // localStorageから料理を取得
    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];

    // --------------------------------
    // 表示する料理を決める
    // --------------------------------
    const displayList =
        showAll
        ? recipes
        : recipes.slice(-3);


    // 保存されている料理を1つずつ処理
    displayList.forEach(function(recipe) {

        // 新しいdivを作る
        const card =
            document.createElement("div");


        // recipe-cardというclassを付ける
        card.classList.add("recipe-card");

        // カードの中身
        card.innerHTML = `

        <!-- =========================
            料理のアイコン
        ========================== -->

        <div class="recipe-image">
            ${
                recipe.image
                ? `<img
                        src="${recipe.image}"
                        alt="${recipe.name}"
                >`
                : "🍳"
            }
        </div>


        <!-- =========================
            料理の情報
        ========================== -->

        <div class="recipe-info">

            <!-- 料理名 -->
            <h3>
                ${recipe.name}
            </h3>


            <!-- 分類と食数 -->
            <p>
                ${recipe.category}
                ・
                ${recipe.servings}食分
            </p>


            <!-- 1食あたりの値段 -->
            <strong>
                ¥${recipe.pricePerMeal} / 食
            </strong>


            <!-- 評価 -->
            <span>
                ${"★".repeat(recipe.rating)}
                ${"☆".repeat(5 - recipe.rating)}
            </span>


            <!-- =========================
                削除ボタン
            ========================== -->

            <button
                class="delete-recipe-button"
                data-id="${recipe.id}"
            >
                🗑 削除
            </button>

        </div>

    `;
        // 新しい料理を一番前に追加
        recipeCards.prepend(card);

        // --------------------------------
        // 削除ボタンを取得
        // --------------------------------

        const deleteButton =
            card.querySelector(".delete-recipe-button");


        // --------------------------------
        // 削除ボタンがクリックされたら
        // deleteRecipeを実行
        // --------------------------------

        deleteButton.addEventListener(
            "click",
            function() {

                // ボタンに入っているIDを取得
                const id =
                    Number(deleteButton.dataset.id);


                // そのIDの料理を削除
                deleteRecipe(id);

            }
        );
    });

}

// ========================================
// 料理を削除する
// ========================================


// 削除ボタンを押したときの処理
function deleteRecipe(recipeId) {

    // --------------------------------
    // localStorageから料理を取得
    // --------------------------------
    let recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];

    // --------------------------------
    // 削除する料理を確認
    // --------------------------------

    const targetRecipe =
        recipes.find(function(recipe) {

            return recipe.id === recipeId;

        });
    // --------------------------------
    // 本当に削除するか確認
    // --------------------------------
    const result =
        confirm(
            "「" +
            targetRecipe.name +
            "」を削除しますか？"
        );


    // キャンセルされた場合
    if (!result) {

        return;

    }
    // --------------------------------
    // 指定した料理を除外
    // --------------------------------
    recipes =
        recipes.filter(function(recipe) {

            return recipe.id !== recipeId;

        });


    // --------------------------------
    // 更新したデータを保存
    // --------------------------------

    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)
    );


    // --------------------------------
    // 画面を更新
    // --------------------------------
    displayRecipes();
    updateKitchenStats();
    updateFoodChart();
    updateCookingLevel();
    updateMealOptions();
    displayMeals();
    updateAverageMealPrice();
}

// ========================================
// キッチンの統計情報を更新する
// ========================================

function updateKitchenStats() {

    // ========================================
    // 保存されている献立を取得
    // ========================================

    const meals =
        JSON.parse(
            localStorage.getItem("meals")
        ) || [];


    // ========================================
    // 保存されている料理を取得
    // ========================================

    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];


    // ========================================
    // 今月を取得
    // ========================================

    const today = new Date();

    const currentYear =
        today.getFullYear();

    const currentMonth =
        today.getMonth() + 1;


    // ========================================
    // 今月の献立だけ取り出す
    // ========================================

    const thisMonthMeals =
        meals.filter(function(meal) {

            const mealDate =
                new Date(meal.date);

            const mealYear =
                mealDate.getFullYear();

            const mealMonth =
                mealDate.getMonth() + 1;

            return (
                mealYear === currentYear &&
                mealMonth === currentMonth
            );

        });


    // ========================================
    // 今月の食費を計算
    // ========================================

    let totalFoodCost = 0;


    thisMonthMeals.forEach(function(meal) {

        // 献立に入っている料理のID
        const dishIds = [
            meal.main,
            meal.soup,
            meal.mainDish,
            meal.sideDish
        ];


        // 実際の料理データを探す
        const dishes =
            dishIds
            .map(function(id) {

                return recipes.find(
                    function(recipe) {

                        return String(recipe.id)
                            === String(id);

                    }
                );

            })
            .filter(function(recipe) {

                return recipe;

            });


        // 1献立分の金額を計算
        let mealPrice = 0;


        dishes.forEach(function(recipe) {

            mealPrice +=
                recipe.pricePerMeal || 0;

        });


        // 今月の食費に追加
        totalFoodCost += mealPrice;

    });


    // ========================================
    // 今月の自炊回数
    // ========================================

    const cookingCount =
        thisMonthMeals.length;


    // ========================================
    // HTMLに表示
    // ========================================

    const statCards =
        document.querySelectorAll(".stat-card");


    // 1枚目 → 今月の食費
    statCards[0]
        .querySelector("strong")
        .textContent =
        "¥" + totalFoodCost.toLocaleString();


    // 2枚目 → 今月の自炊
    statCards[1]
        .querySelector("strong")
        .textContent =
        cookingCount + "回";

}



// ========================================
// 今日何作ろう？
// ========================================


// ----------------------------------------
// 「探してみる」ボタンを取得
// ----------------------------------------
const searchMenuButton =
    document.querySelector("#searchMenuButton");

// ----------------------------------------
// ボタンを押したら検索する
// ----------------------------------------

searchMenuButton.addEventListener(
    "click",
    searchMenu
);



// ========================================
// 料理を検索する関数
// ========================================

function searchMenu() {

    // --------------------------------
    // 選択された分類を取得
    // --------------------------------

    const category =
        document.querySelector(
            "#searchCategory"
        ).value;



    // --------------------------------
    // 選択された予算を取得
    // --------------------------------

    const price =
        document.querySelector(
            "#searchPrice"
        ).value;



    // --------------------------------
    // 保存されている料理を取得
    // --------------------------------

    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];



    // --------------------------------
    // 条件に合う料理だけ取り出す
    // --------------------------------

    const results =
        recipes.filter(function(recipe) {


            // ----------------------------
            // 分類の条件
            // ----------------------------

            const categoryOK =
                category === "all" ||
                recipe.category === category;



            // ----------------------------
            // 予算の条件
            // ----------------------------

            const priceOK =
                price === "all" ||
                recipe.pricePerMeal <= Number(price);



            // ----------------------------
            // 両方OKなら残す
            // ----------------------------

            return categoryOK && priceOK;

        });



    // --------------------------------
    // 結果を表示
    // --------------------------------

    displayMenuResults(results);

}


// ========================================
// 検索結果を画面に表示
// ========================================

function displayMenuResults(results) {

    // 結果を表示する場所
    const menuResult =
        document.querySelector("#menuResult");


    // 一度空にする
    menuResult.innerHTML = "";



    // --------------------------------
    // 結果が0件だった場合
    // --------------------------------

    if (results.length === 0) {

        menuResult.innerHTML = `

            <p class="no-result">
                😢 条件に合う料理がありませんでした。
                <br>
                条件を変えて探してみよう！
            </p>

        `;

        return;
    }



    // --------------------------------
    // 結果をシャッフル
    // --------------------------------
    const shuffled =
        [...results].sort(
            () => Math.random() - 0.5
        );



    // --------------------------------
    // 最大3件表示
    // --------------------------------

    const displayRecipes =
        shuffled.slice(0, 3);



    // --------------------------------
    // カードを作る
    // --------------------------------
    displayRecipes.forEach(function(recipe) {

        // カードを作る
        const card =
            document.createElement("div");

        // CSSを適用
        card.classList.add(
            "menu-result-card"
        );



        // カードの中身
        card.innerHTML = `
            <h3>
                🍳 ${recipe.name}
            </h3>
            <p>
                ${recipe.category}
                ・
                ${recipe.servings}食分
            </p>
            <p class="menu-result-price">
                ¥${recipe.pricePerMeal} / 食
            </p>
            <p>
                ${"★".repeat(recipe.rating)}
                ${"☆".repeat(5 - recipe.rating)}
            </p>
        `;

        // 画面に追加
        menuResult.appendChild(card);

    });

}





// ========================================
// 食費グラフ
// ========================================

function updateFoodChart() {

    // ========================================
    // 保存されている献立
    // ========================================

    const meals =
        JSON.parse(
            localStorage.getItem("meals")
        ) || [];


    // ========================================
    // 保存されている料理
    // ========================================

    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];


    // ========================================
    // 今日の日付
    // ========================================

    const today =
        new Date();

    const currentYear =
        today.getFullYear();

    const currentMonth =
        today.getMonth();


    // ========================================
    // 今月の献立だけ取り出す
    // ========================================

    const thisMonthMeals =
        meals.filter(function(meal) {

            const mealDate =
                new Date(meal.date);

            return (
                mealDate.getFullYear()
                === currentYear

                &&

                mealDate.getMonth()
                === currentMonth
            );

        });


    // ========================================
    // 週ごとの食費
    // ========================================

    const weeklyCosts = {

        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0

    };


    // ========================================
    // 献立を週ごとに分ける
    // ========================================

    thisMonthMeals.forEach(
        function(meal) {

            // ----------------------------
            // 献立の日付
            // ----------------------------

            const date =
                new Date(meal.date);


            // ----------------------------
            // 日にち
            // ----------------------------

            const day =
                date.getDate();


            // ----------------------------
            // 何週目か
            // ----------------------------

            const week =
                Math.ceil(day / 7);


            // ----------------------------
            // 献立の料理ID
            // ----------------------------

            const dishIds = [

                meal.main,
                meal.soup,
                meal.mainDish,
                meal.sideDish

            ];


            // ----------------------------
            // 料理データを取得
            // ----------------------------

            const dishes =
                dishIds
                .map(function(id) {

                    return recipes.find(
                        function(recipe) {

                            return String(recipe.id)
                                === String(id);

                        }
                    );

                })
                .filter(function(recipe) {

                    return recipe;

                });


            // ----------------------------
            // この献立の金額
            // ----------------------------

            let mealPrice = 0;


            dishes.forEach(function(recipe) {

                mealPrice +=
                    recipe.pricePerMeal || 0;

            });


            // ----------------------------
            // 週の食費に追加
            // ----------------------------

            weeklyCosts[week] +=
                mealPrice;

        }
    );


    // ========================================
    // グラフ
    // ========================================

    const chart =
        document.querySelector("#foodChart");


    chart.innerHTML = "";


    // ========================================
    // 一番高い週
    // ========================================

    const maxCost =
        Math.max(
            ...Object.values(weeklyCosts)
        );


    // ========================================
    // 各週の棒を作る
    // ========================================

    Object.keys(weeklyCosts).forEach(
        function(week) {

            const cost =
                weeklyCosts[week];


            const container =
                document.createElement("div");

            container.classList.add(
                "food-bar-container"
            );


            // ----------------------------
            // 金額
            // ----------------------------

            const price =
                document.createElement("span");

            price.classList.add(
                "food-bar-price"
            );

            price.textContent =
                "¥" + cost.toLocaleString();


            // ----------------------------
            // 棒
            // ----------------------------

            const bar =
                document.createElement("div");

            bar.classList.add(
                "food-bar"
            );


            let height = 4;


            if (maxCost > 0) {

                height =
                    (cost / maxCost) * 170;

            }


            bar.style.height =
                height + "px";


            // ----------------------------
            // 週ラベル
            // ----------------------------

            const label =
                document.createElement("span");

            label.classList.add(
                "food-week-label"
            );

            label.textContent =
                week + "週目";


            // ----------------------------
            // グラフに追加
            // ----------------------------

            container.appendChild(price);

            container.appendChild(bar);

            container.appendChild(label);

            chart.appendChild(container);

        }
    );


    // ========================================
    // 今月の合計
    // ========================================

    let total = 0;


    Object.values(weeklyCosts)
        .forEach(function(cost) {

            total += cost;

        });


    // ========================================
    // 合計を表示
    // ========================================

    document.querySelector(
        "#chartTotal"
    ).textContent =
        "¥" + total.toLocaleString();

}

// ========================================
// ページを開いたとき
// ========================================

// 保存されている料理を表示
displayRecipes();

// 今月の統計
updateKitchenStats();

// 食費グラフ
updateFoodChart();

// Cooking Level
updateCookingLevel();

updateMealOptions();

displayMeals();

updateAverageMealPrice();

// ========================================
// Cooking Level
// ========================================
function updateCookingLevel() {

    // --------------------------------
    // 保存されている料理を取得
    // --------------------------------
    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];

    // --------------------------------
    // 作った料理の数
    // --------------------------------
    const cookingCount =
        recipes.length;

    // --------------------------------
    // レベルを計算
    // --------------------------------
    // 5品作るごとに1レベル上がる
    const level =
        Math.floor(cookingCount / 5) + 1;

    // --------------------------------
    // 次のレベルまであと何品？
    // --------------------------------
    const remainder =
        cookingCount % 5;

    const remaining =
        5 - remainder;

    // --------------------------------
    // レベルゲージの進み具合
    // --------------------------------
    const progress =
        (remainder / 5) * 100;


    // --------------------------------
    // レベルに応じたアイコンと称号
    // --------------------------------

    // 最初の状態
    let icon = "🌱";
    let title = "自炊ビギナー";

    // Lv.3以上
    if (level >= 3) {
        icon = "🌿";
        title = "自炊に慣れてきた！";
    }

    // Lv.5以上
    if (level >= 5) {
        icon = "🌳";
        title = "自炊マスター";
    }

    // Lv.8以上
    if (level >= 8) {
        icon = "🍳";
        title = "キッチン上級者";
    }

    // Lv.12以上
    if (level >= 12) {
        icon = "👩‍🍳";
        title = "自炊の達人";
    }

    // Lv.20以上
    if (level >= 20) {
        icon = "👑";
        title = "My Kitchen マスター";
    }

    // --------------------------------
    // HTMLを書き換える
    // --------------------------------

    document.querySelector(
        "#cookingLevel"
    ).textContent =
        "Lv." + level;

    // アイコン
    document.querySelector(
        "#levelIcon"
    ).textContent =
        icon;

    // --------------------------------
    // 称号を表示
    // --------------------------------

    document.querySelector(
        "#levelTitle"
    ).textContent =
        title;

    // --------------------------------
    // ゲージを動かす
    // --------------------------------

    document.querySelector(
        "#levelProgress"
    ).style.width =
        progress + "%";

    // --------------------------------
    // 次のレベルまでの表示
    // --------------------------------
    document.querySelector(
        "#levelText"
    ).textContent =
        "次のレベルまであと"
        + remaining
        + "品！";

}



// ========================================
// 料理写真のプレビュー
// ========================================
// 写真を選択する場所
const recipeImage =
    document.querySelector("#recipeImage");

// プレビューを表示する場所
const imagePreview =
    document.querySelector("#imagePreview");

// 写真が選ばれたとき
recipeImage.addEventListener(
    "change",
    function() {

        // 選択されたファイル
        const file =
            recipeImage.files[0];

        // 写真が選ばれていなかったら終了
        if (!file) {
            return;
        }

        // ファイルを読み込む
        const reader =
            new FileReader();


        // 読み込みが終わったら
        reader.addEventListener(
            "load",
            function() {

                // プレビューを表示
                imagePreview.innerHTML = `

                    <img
                        src="${reader.result}"
                        alt="料理の写真"
                    >
                `;
            }
        );


        // 写真を読み込む
        reader.readAsDataURL(file);
    }
);




// ========================================
// 献立の選択肢を作る
// 料理の分類ごとに表示する
// ========================================

function updateMealOptions() {

    // --------------------------------
    // 保存されている料理を取得
    // --------------------------------

    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];


    // --------------------------------
    // 主食
    // ごはん・麺を表示
    // --------------------------------

    const mealMain =
        document.querySelector("#mealMain");


    mealMain.innerHTML = `
        <option value="">
            選択してください
        </option>
    `;


    recipes
        .filter(function(recipe) {

            return (
                recipe.category === "ごはん" ||
                recipe.category === "麺"
            );

        })
        .forEach(function(recipe) {

            const option =
                document.createElement("option");

            option.value =
                recipe.id;

            option.textContent =
                recipe.name;

            mealMain.appendChild(option);

        });


    // --------------------------------
    // 汁物
    // --------------------------------

    const mealSoup =
        document.querySelector("#mealSoup");


    mealSoup.innerHTML = `
        <option value="">
            選択してください
        </option>
    `;


    recipes
        .filter(function(recipe) {

            return recipe.category === "汁物";

        })
        .forEach(function(recipe) {

            const option =
                document.createElement("option");

            option.value =
                recipe.id;

            option.textContent =
                recipe.name;

            mealSoup.appendChild(option);

        });


    // --------------------------------
    // 主菜
    // --------------------------------

    const mealMainDish =
        document.querySelector("#mealMainDish");


    mealMainDish.innerHTML = `
        <option value="">
            選択してください
        </option>
    `;


    recipes
        .filter(function(recipe) {

            return recipe.category === "主菜";

        })
        .forEach(function(recipe) {

            const option =
                document.createElement("option");

            option.value =
                recipe.id;

            option.textContent =
                recipe.name;

            mealMainDish.appendChild(option);

        });


    // --------------------------------
    // 副菜
    // --------------------------------

    const mealSideDish =
        document.querySelector("#mealSideDish");


    mealSideDish.innerHTML = `
        <option value="">
            選択してください
        </option>
    `;


    recipes
        .filter(function(recipe) {

            return recipe.category === "副菜";

        })
        .forEach(function(recipe) {

            const option =
                document.createElement("option");

            option.value =
                recipe.id;

            option.textContent =
                recipe.name;

            mealSideDish.appendChild(option);

        });

}




// ========================================
// 献立を保存する
// ========================================

function saveMeal() {

    // --------------------------------
    // 入力された日付
    // --------------------------------

    const date =
        document.querySelector(
            "#mealDate"
        ).value;


    // --------------------------------
    // 選択された料理
    // --------------------------------

    const main =
        document.querySelector(
            "#mealMain"
        ).value;


    const soup =
        document.querySelector(
            "#mealSoup"
        ).value;


    const mainDish =
        document.querySelector(
            "#mealMainDish"
        ).value;


    const sideDish =
        document.querySelector(
            "#mealSideDish"
        ).value;


    // --------------------------------
    // 日付チェック
    // --------------------------------

    if (date === "") {

        alert("食べた日を入力してください！");

        return;

    }


    // --------------------------------
    // 少なくとも1品選択
    // --------------------------------

    if (
        main === "" &&
        soup === "" &&
        mainDish === "" &&
        sideDish === ""
    ) {

        alert("料理を1つ以上選んでください！");

        return;

    }


    // --------------------------------
    // 献立データ
    // --------------------------------

    const meal = {

        id: Date.now(),

        date: date,

        type: mealType,

        main: main,

        soup: soup,

        mainDish: mainDish,

        sideDish: sideDish

    };


    // --------------------------------
    // 今までの献立を取得
    // --------------------------------

    let meals =
        JSON.parse(
            localStorage.getItem("meals")
        ) || [];


    // --------------------------------
    // 新しい献立を追加
    // --------------------------------

    meals.push(meal);


    // --------------------------------
    // 保存
    // --------------------------------

    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );

    // --------------------------------
    // 画面を更新
    // --------------------------------

    displayMeals();
    updateAverageMealPrice();
    updateKitchenStats();
    updateFoodChart();

    // --------------------------------
    // 完了
    // --------------------------------

    alert("献立を記録しました！");

}




// ========================================
// 保存した献立を表示する
// ========================================

function displayMeals() {

    // --------------------------------
    // 献立カードを入れる場所
    // --------------------------------

    const mealCards =
        document.querySelector(
            "#mealCards"
        );


    // --------------------------------
    // 一度空にする
    // --------------------------------

    mealCards.innerHTML = "";


    // --------------------------------
    // 保存されている献立を取得
    // --------------------------------

    const meals =
        JSON.parse(
            localStorage.getItem("meals")
        ) || [];


    // --------------------------------
    // 料理データも取得
    // --------------------------------

    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];


    // --------------------------------
    // 献立を1つずつ処理
    // --------------------------------

    meals.forEach(function(meal) {


        // --------------------------------
        // 献立に入っている料理を探す
        // --------------------------------

        const dishIds = [

            meal.main,

            meal.soup,

            meal.mainDish,

            meal.sideDish

        ];


        // 実際の料理データを取得

        const dishes =
            dishIds

            .map(function(id) {

                return recipes.find(
                    function(recipe) {

                        return String(recipe.id)
                            === String(id);

                    }
                );

            })

            // 選択されていない料理を除外
            .filter(function(recipe) {

                return recipe;

            });


        // --------------------------------
        // 1食分の値段を計算
        // --------------------------------

        let totalPrice = 0;


        dishes.forEach(function(recipe) {

            totalPrice +=
                recipe.pricePerMeal || 0;

        });


        // --------------------------------
        // 献立カードを作る
        // --------------------------------

        const card =
            document.createElement("div");


        card.classList.add(
            "saved-meal-card"
        );


        // --------------------------------
        // カードの中身
        // --------------------------------

        card.innerHTML = `

            <!-- 日付 -->
            <div class="meal-date">
                📅 ${meal.date}

                <span class="meal-type">
                    ${
                        meal.type === "朝"
                            ? "🌅 朝"
                            : meal.type === "昼"
                            ? "☀️ 昼"
                            : meal.type === "晩"
                            ? "🌙 晩"
                            : "🍪 間食"
                    }
                </span>
            </div>

            <!-- タイトル -->
            <div class="meal-menu">
                🍽️ 今日の献立
            </div>

            <!-- 料理 -->
            <div class="meal-dishes">
                ${
                    dishes.map(
                        function(recipe) {
                            return `
                                <div
                                    class="meal-dish"
                                >
                                    <span>
                                        🍳
                                        ${recipe.name}
                                    </span>

                                    <span
                                        class="meal-price"
                                    >

                                        ${
                                            recipe.pricePerMeal
                                            ? `¥${recipe.pricePerMeal}`
                                            : "価格未設定"
                                        }
                                    </span>
                                </div>
                            `;
                        }
                    ).join("")
                }

            </div>

             <!-- 合計 -->
            <div class="meal-bottom">

                <strong class="meal-total">
                    ¥${totalPrice}
                </strong>

                <button
                    class="delete-meal-button"
                    data-id="${meal.id}"
                >
                    🗑 削除
                </button>

            </div>

        `;
        // --------------------------------
        // 一番上に追加
        // --------------------------------
        mealCards.prepend(card);

        // --------------------------------
        // 削除ボタン
        // --------------------------------

        const deleteButton =
            card.querySelector(".delete-meal-button");


        deleteButton.addEventListener(
            "click",
            function() {

                const id =
                    Number(deleteButton.dataset.id);

                deleteMeal(id);

            }
        );
    });

}


// ========================================
// 献立を削除する
// ========================================

function deleteMeal(mealId) {

    // 保存されている献立を取得
    let meals =
        JSON.parse(
            localStorage.getItem("meals")
        ) || [];


    // 削除する献立を探す
    const targetMeal =
        meals.find(function(meal) {

            return meal.id === mealId;

        });


    // 見つからなかった場合
    if (!targetMeal) {
        return;
    }


    // 確認
    const result =
        confirm(
            "この献立を削除しますか？"
        );


    // キャンセル
    if (!result) {
        return;
    }


    // 指定した献立を削除
    meals =
        meals.filter(function(meal) {

            return meal.id !== mealId;

        });


    // 保存
    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );


    // 画面を更新
    displayMeals();
    updateAverageMealPrice();
    updateKitchenStats();
    updateFoodChart();

}





// ========================================
// 平均1食の値段を計算
// ========================================

function updateAverageMealPrice() {

    // --------------------------------
    // 保存されている献立を取得
    // --------------------------------

    const meals =
        JSON.parse(
            localStorage.getItem("meals")
        ) || [];


    // --------------------------------
    // 献立がまだない場合
    // --------------------------------

    if (meals.length === 0) {

        document.querySelector(
            "#averageMealPrice"
        ).textContent = "¥ -";

        return;

    }


    // --------------------------------
    // 料理データを取得
    // --------------------------------

    const recipes =
        JSON.parse(
            localStorage.getItem("recipes")
        ) || [];


    // --------------------------------
    // 全献立の合計金額
    // --------------------------------

    let totalPrice = 0;


    // --------------------------------
    // 献立を1つずつ計算
    // --------------------------------

    meals.forEach(function(meal) {

        // 献立に入っている料理
        const dishIds = [

            meal.main,
            meal.soup,
            meal.mainDish,
            meal.sideDish

        ];


        // 料理データを探す

        dishIds.forEach(function(id) {

            const recipe =
                recipes.find(
                    function(recipe) {

                        return String(recipe.id)
                            === String(id);

                    }
                );

            // 料理が見つかったら
            if (recipe) {
                totalPrice +=
                    recipe.pricePerMeal || 0;
            }
        });
    });

    // --------------------------------
    // 平均を計算
    // --------------------------------
    const average =
        Math.round(
            totalPrice / meals.length
        );

    // --------------------------------
    // 画面に表示
    // --------------------------------
    document.querySelector(
        "#averageMealPrice"
    ).textContent =
        `¥${average}`;

}




// ========================================
// 最近作った料理
// 「すべて見る」
// ========================================

const showAllRecipesButton =
    document.querySelector(
        "#showAllRecipesButton"
    );


let showingAllRecipes = false;


showAllRecipesButton.addEventListener(
    "click",
    function() {

        // 表示状態を反転
        showingAllRecipes =
            !showingAllRecipes;


        // 料理を表示
        displayRecipes(
            showingAllRecipes
        );


        // ボタンの文字を変更
        if (showingAllRecipes) {

            showAllRecipesButton.textContent =
                "閉じる ↑";

        } else {

            showAllRecipesButton.textContent =
                "すべて見る →";

        }

    }
);


// ========================================
// 献立を記録
// 開閉
// ========================================

const mealToggleButton =
    document.querySelector("#mealToggleButton");

const mealForm =
    document.querySelector("#mealForm");


mealToggleButton.addEventListener(
    "click",
    function() {

        mealForm.classList.toggle("is-hidden");

        if (
            mealForm.classList.contains("is-hidden")
        ) {

            mealToggleButton.textContent = "＋";

        } else {

            mealToggleButton.textContent = "−";

        }

    }
);


// ========================================
// 献立の記録
// 開閉
// ========================================

const savedMealToggleButton =
    document.querySelector("#savedMealToggleButton");

const savedMealContent =
    document.querySelector("#savedMealContent");


savedMealToggleButton.addEventListener(
    "click",
    function() {

        savedMealContent.classList.toggle("is-hidden");

        if (
            savedMealContent.classList.contains("is-hidden")
        ) {

            savedMealToggleButton.textContent = "＋";

        } else {

            savedMealToggleButton.textContent = "−";

        }

    }
);